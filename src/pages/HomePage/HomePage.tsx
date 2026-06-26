import { useState, useRef } from "react";
import { vinApi } from "../../api/vinApi";
import { useHistory } from "../../hooks/useHistory";
import { Button } from "../../components/Button/Button";
import { VIN_LENGTH } from "../../constants/global.constants";
import cls from "./HomePage.module.css";
import type { IVinResult } from "../../types/global.types";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { ErrorBlock } from "../../components/ErrorBlock";
import { vinSchema } from "../../utils/validation.schema";

export const HomePage = () => {
  const [vinCode, setVinCode] = useState("");
  const [vehicleCharacteristics, setVehicleCharacteristics] = useState<IVinResult[]>([]);
  const [searchHistory, addToSearchHistory] = useHistory();
  const [activeVin, setActiveVin] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [performVinDecoding, isDecodingInProgress, decodingError] = useFetch(vinApi.decodeVin);

  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const handleDecode = async (targetVin: string) => {
    setIsError(false);
    setValidationError(null);

    const result = vinSchema.safeParse({ vin: targetVin });

    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    const results = await performVinDecoding(targetVin.trim());
    if (!results) return;

    setActiveVin(targetVin);

    const errorEntry = results.find((item: any) => item.Variable === "Error Text");
    const errorCodeEntry = results.find((item: any) => item.Variable === "Error Code");
    const isErrorStatus = errorCodeEntry && errorCodeEntry.Value !== "0";

    if (isErrorStatus) {
      setVehicleCharacteristics([
        { Variable: "Error Code", Value: errorCodeEntry.Value, VariableId: 0 },
        { Variable: "Error Text", Value: errorEntry?.Value || "Unknown error", VariableId: 0 },
      ]);
      setIsError(true);
    } else if (results.length > 0) {
      setVehicleCharacteristics(results.filter((item: any) => item.Value));
      addToSearchHistory(targetVin);
    } else {
      setVehicleCharacteristics([{ Variable: "Error", Value: "No data found for this VIN.", VariableId: 0 }]);
      setIsError(true);
    }

    setTimeout(() => {
      resultsSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleClear = () => {
    setVehicleCharacteristics([]);
    setIsError(false);
    setVinCode("");
    setActiveVin(null);
  };

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setVinCode(value);

    if (validationError) {
      setValidationError(null);
    }
  };

  return (
    <div className={cls.homePage}>
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
              onChange={handleVinChange}
              maxLength={VIN_LENGTH}
              placeholder="Enter 17-character VIN"
            />
            {validationError && <span className={cls.errorMessage}>{validationError}</span>}
          </div>

          <Button type="submit" disabled={isDecodingInProgress}>
            {isDecodingInProgress ? "Processing..." : "Decode"}
          </Button>
        </form>
      </section>

      {isDecodingInProgress && <Loader />}
      {decodingError && <ErrorBlock errorText={decodingError} />}

      {searchHistory.length > 0 && (
        <section className={cls.historySection}>
          <h3>Search History:</h3>
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
        </section>
      )}

      <section className={cls.resultsSection} ref={resultsSectionRef}>
        <div className={cls.resultsHeader}>
          <h2>{isError ? "Decoding Issues" : "Decoding Results"}</h2>
          {vehicleCharacteristics.length > 0 && (
            <Button onClick={handleClear} className={cls.clearButton}>
              Clear
            </Button>
          )}
        </div>

        {activeVin && <h3 className={cls.activeVinLabel}>VIN: {activeVin}</h3>}

        <div className={cls.resultGrid}>
          {vehicleCharacteristics.length > 0 ? (
            vehicleCharacteristics.map((item) => (
              <div key={item.Variable} className={`${cls.resultCard} ${isError ? cls.errorCard : ""}`}>
                <span className={cls.label}>{item.Variable}:</span>
                <span className={cls.value}>{item.Value}</span>
              </div>
            ))
          ) : (
            <p>Results will be displayed here after decoding.</p>
          )}
        </div>
      </section>
    </div>
  );
};
