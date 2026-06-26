import cls from "./ErrorBlock.module.css";

interface ErrorBlockProps {
  errorText: string;
}

export const ErrorBlock = ({ errorText }: ErrorBlockProps) => (
  <div className={cls.errorBox}>
    <h4 className={cls.title}>Decoding Issue</h4>
    <p>{errorText}</p>
  </div>
);
