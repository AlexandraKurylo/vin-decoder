import { useState, useRef, useEffect } from "react";
import { useLazyDecodeVinQuery, vinApi } from "../../api/vin.api";
import { useHistory } from "../../hooks/useHistory";
import { Button } from "../../components/Button";
import cls from "./HomePage.module.css";
import { Loader } from "../../components/Loader";
import { ErrorBlock } from "../../components/ErrorBlock";
import { vinSchema } from "../../utils/validation.schema";
import type { IApiError, IVinResult } from "../../types/global.types";
import { useDispatch } from "react-redux";

export const HomePage = () => {
  const [vinCode, setVinCode] = useState("");
  const [activeVin, setActiveVin] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const [searchHistory, addToSearchHistory] = useHistory();
  const [trigger, { data: results, isFetching, error }] = useLazyDecodeVinQuery();
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (showResults && results && !isFetching) {
      setTimeout(() => {
        resultsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [showResults, results, isFetching]);

  const handleDecode = async (targetVin: string) => {
    setValidationError(null);
    const result = vinSchema.safeParse({ vin: targetVin });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    try {
      await trigger(targetVin).unwrap();

      if (!searchHistory.includes(targetVin)) {
        addToSearchHistory(targetVin);
      }

      setActiveVin(targetVin);
      setShowResults(true);
    } catch (err) {
      console.error("Fetch error:", err);
      setShowResults(true);
    }
  };

  const handleClear = () => {
    setVinCode("");
    setActiveVin(null);
    dispatch(vinApi.util.resetApiState());
  };

  const errorCodeItem = results?.find((i) => i.Variable === "Error Code");
  const isSuccess = errorCodeItem ? errorCodeItem.Value === "0" : true;

  return (
    <div className={cls.homePageContainer}>
      <section className={cls.decoderSection}>
        <h2 className={cls.title}>VIN Decoder</h2>
        <form
          className={cls.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleDecode(vinCode);
          }}
        >
          <div className={cls.inputContainer}>
            <input
              className={`${cls.input} ${validationError ? cls.inputError : ""}`}
              value={vinCode}
              onChange={(e) => setVinCode(e.target.value.toUpperCase())}
              placeholder="Enter 17-character VIN"
            />
            {validationError && <span className={cls.errorMessage}>{validationError}</span>}
          </div>

          <Button type="submit" disabled={isFetching}>
            {isFetching ? "Processing..." : "Decode"}
          </Button>
        </form>
      </section>

      {isFetching && <Loader />}

      {error && <ErrorBlock errorText={(error as IApiError)?.message || "An error occurred while decoding."} />}

      <section className={cls.historySection}>
        <h3>Search History:</h3>
        {searchHistory.length > 0 ? (
          <div className={cls.historyList}>
            {searchHistory.map((vin) => (
              <Button
                key={vin}
                onClick={() => {
                  setVinCode(vin);
                  handleDecode(vin);
                }}
              >
                {vin}
              </Button>
            ))}
          </div>
        ) : (
          <p className={cls.placeholderText}>No search history available yet.</p>
        )}
      </section>

      <section className={cls.resultsSection} ref={resultsSectionRef}>
        <div className={cls.resultsHeader}>
          <h2>{isFetching ? "Processing..." : isSuccess ? "Decoding Results" : "Decoding Issues"}</h2>

          {results && (
            <Button onClick={handleClear} className={cls.clearButton}>
              Clear
            </Button>
          )}
        </div>

        {!results && !isFetching && !error && (
          <div className={cls.emptyState}>
            <p>Decoding results will appear here after you enter a valid VIN code.</p>
          </div>
        )}

        {activeVin && results && <h3 className={cls.activeVinLabel}>VIN: {activeVin}</h3>}

        {results && !isFetching && (
          <div className={cls.resultGrid}>
            {results.map((item: IVinResult) => {
              const isErrorCard = item.Variable.includes("Error") && !isSuccess;
              return (
                <div key={item.Variable} className={`${cls.resultCard} ${isErrorCard ? cls.errorCard : ""}`}>
                  <span className={cls.label}>{item.Variable}:</span>
                  <span className={cls.value}>{item.Value}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
