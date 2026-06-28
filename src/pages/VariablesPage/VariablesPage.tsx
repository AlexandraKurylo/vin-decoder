import { useState, useMemo } from "react";
import { useGetVariablesQuery } from "../../api/variables.api";
import { VariableSummaryCard } from "../../components/VariableSummaryCard";
import cls from "./VariablesPage.module.css";
import type { IApiError } from "../../types/global.types";
import { Loader } from "../../components/Loader";

export const VariablesPage = () => {
  const { data: variables, isFetching, error } = useGetVariablesQuery();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const filteredVariables = useMemo(() => {
    if (!variables) return [];
    const query = search.toLowerCase();
    return variables.filter((v) => v.Name?.toLowerCase().includes(query) || v.GroupName?.toLowerCase().includes(query));
  }, [variables, search]);

  const totalPages = Math.ceil(filteredVariables.length / itemsPerPage);

  const paginatedVariables = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVariables.slice(start, start + itemsPerPage);
  }, [filteredVariables, currentPage]);

  if (isFetching) return <Loader />;
  if (error) return <div className={cls.error}>Error: {(error as IApiError).message}</div>;

  return (
    <>
      <h2 className={cls.title}>Vehicle Variables</h2>
      <input
        className={cls.searchBar}
        placeholder="Search..."
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      {filteredVariables.length === 0 ? (
        <div className={cls.noResults}>
          <h3>NO VARIABLES FOUND</h3>
          <p>Try adjusting your search query.</p>
        </div>
      ) : (
        <>
          <div className={cls.variablesPageGrid}>
            {paginatedVariables.map((v) => (
              <VariableSummaryCard key={v.ID} variable={v} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className={cls.pagination}>
              <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
