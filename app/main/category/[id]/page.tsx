"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { GetTiendasByCategorias } from "@/action/gettiendasbycategorias-action";
import { datosProvince } from "@/src/utils/province";

import { ScreenLoading } from "@/src/components/utils/ScreenLoading/ScreenLoading";
import { Spinner } from "@/src/components/utils/Spinner/Spinner";
import { TiendasCategoryList } from "@/src/components/category/TiendasCategoryList";

import { FilterByCategoryType } from "@/src/types/FilterbyCategorytype";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const [distrito, setDistrito] = useState<DistritoType[]>();
  const [corregimiento, setCorregimiento] = useState<string[]>();
  const [filters, setFilters] = useState<FilterByCategoryType | null>(null);

  const { handleSubmit, register, setValue, reset } = useForm<FilterByCategoryType>();

  // Inicializa filtros cuando cambia el id
  useEffect(() => {
    if (id) {
      setValue("id", +id);
      setFilters({
        id: +id,
        provincia: "",
        distrito: "",
        corregimiento: "",
        search: "",
        page,
      });
    }
  }, [id, setValue]);

  // Query principal
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "tiendas-category",
      filters?.id,
      filters?.provincia,
      filters?.distrito,
      filters?.corregimiento,
      filters?.search,
      filters?.page,
    ],
    queryFn: () => GetTiendasByCategorias(filters!),
    enabled: !!filters,
  });

  // Eventos de formulario
  const onSubmit = (formData: FilterByCategoryType) => {
    setFilters({ ...formData, id: +id });
  };

  const onChangeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provincia = datosProvince.provincia.find(p => p.nombre === e.target.value);
    setDistrito(provincia?.distrito);
    setCorregimiento([]); // resetear corregimiento
  };

  const onChangeDistrito = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const distr = distrito?.find(d => d.nombre === e.target.value);
    setCorregimiento(distr?.corregimientos);
  };

  const handlePageChange = (pageNumber: number) => {
    setFilters(prev => prev ? { ...prev, page: pageNumber } : null);
  };

  const totalPages = data?.lastPage || 0;
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Formulario de filtros */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row md:items-end gap-4 mb-8 bg-white rounded-lg px-5 py-3 text-gray-400"
      >
        {/* Provincia */}
        <select
          className="flex-1 w-full border rounded px-3 py-2 cursor-pointer"
          {...register("provincia")}
          disabled={isLoading}
          onChange={onChangeProvince}
        >
          <option value="">Seleccione la provincia</option>
          {datosProvince.provincia.map(p => (
            <option value={p.nombre} key={p.iso_3166_2}>{p.nombre}</option>
          ))}
        </select>

        {/* Distrito */}
        <select
          className="flex-1 w-full border rounded px-3 py-2 cursor-pointer"
          {...register("distrito")}
          disabled={isLoading}
          onChange={onChangeDistrito}
        >
          <option value="">Seleccione el distrito</option>
          {distrito?.map(d => (
            <option value={d.nombre} key={d.nombre}>{d.nombre}</option>
          ))}
        </select>

        {/* Corregimiento */}
        <select
          className="flex-1 w-full border rounded px-3 py-2 cursor-pointer"
          {...register("corregimiento")}
          disabled={isLoading}
        >
          <option value="">Seleccione el corregimiento</option>
          {corregimiento?.map(c => (
            <option value={c} key={c}>{c}</option>
          ))}
        </select>

        {/* Búsqueda */}
        <input
          type="text"
          placeholder="¿Qué buscas?"
          className="flex-1 w-full border rounded px-3 py-2"
          {...register("search")}
          disabled={isLoading}
        />

        {/* Botones */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full md:w-auto ${isLoading ? "" : "bg-blue-500"} text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg`}
          >
            {isLoading ? <Spinner /> : "Buscar"}
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              reset();
              setFilters({ id: +id, provincia: "", distrito: "", corregimiento: "", search: "", page: 1 });
            }}
            className="w-full md:w-auto bg-gray-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Limpiar
          </button>
        </div>
      </form>

      {/* Grid de tiendas */}
      {isLoading || isFetching ? <ScreenLoading /> : data && <TiendasCategoryList data={data} />}

      {/* Paginación */}
      <div className="flex flex-wrap justify-center mt-8 gap-2">
        {pagesArray.map(p => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className="px-3 py-1 rounded-full shadow-2xl text-black hover:bg-amber-400 hover:text-white transition-all"
          >
            {p}
          </button>
        ))}
      </div>

    </div>
  );
}