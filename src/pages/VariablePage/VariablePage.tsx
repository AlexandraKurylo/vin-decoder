import { useParams, Link } from "react-router-dom";
import { useGetVariablesQuery } from "../../api/variables.api";
import { VariableDetailCard } from "../../components/VariableDetailCard";
import cls from "./VariablePage.module.css";
import { useMemo } from "react";
import type { IApiError } from "../../types/global.types";
import { Loader } from "../../components/Loader";

export const VariablePage = () => {
  const { variableId } = useParams();
  const { data: variables, isFetching, error } = useGetVariablesQuery();

  const variable = useMemo(() => variables?.find((v) => v.ID === Number(variableId)), [variables, variableId]);

  if (isFetching) return <Loader />;
  if (error) return <div className={cls.container}>Error: {(error as IApiError).message}</div>;
  if (!variable) return <div className={cls.container}>Variable not found.</div>;

  return (
    <div className={cls.container}>
      <Link to="/variables" className={cls.backLink}>
        ← Back to list
      </Link>
      <VariableDetailCard variable={variable} />
    </div>
  );
};
