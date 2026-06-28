import { Link } from "react-router-dom";
import cls from "./VariableSummaryCard.module.css";
import type { IVariable } from "../../types/global.types";

export const VariableSummaryCard = ({ variable }: { variable: IVariable }) => (
  <div className={cls.card}>
    <h3 className={cls.title}>{variable.Name}</h3>
    <p className={cls.group}>{variable.GroupName}</p>
    <Link to={`/variables/${variable.ID}`} className={cls.detailsBtn}>
      More information
    </Link>
  </div>
);
