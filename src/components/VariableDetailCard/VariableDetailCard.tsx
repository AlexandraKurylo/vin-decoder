import cls from "./VariableDetailCard.module.css";
import type { IVariable } from "../../api/variables.api";

export const VariableDetailCard = ({ variable }: { variable: IVariable }) => {
  const cleanDescription = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className={cls.detailCard}>
      <h1 className={cls.title}>{variable.Name}</h1>

      <div className={cls.infoGrid}>
        <div className={cls.infoItem}>
          <span>ID:</span> {variable.ID}
        </div>
        <div className={cls.infoItem}>
          <span>Group:</span> {variable.GroupName}
        </div>
        <div className={cls.infoItem}>
          <span>Type:</span> {variable.DataType}
        </div>
      </div>

      <div className={cls.description}>{cleanDescription(variable.Description)}</div>
    </div>
  );
};
