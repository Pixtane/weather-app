import testCodes from "../assets/testCodes.json";
import numericalCodes from "../assets/numericalCodes.json";

type Props = {
  setSelectedTest: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedNumericalTest: React.Dispatch<React.SetStateAction<string | null>>;
  setShowTests: React.Dispatch<React.SetStateAction<boolean>>;
  setWeatherData: React.Dispatch<React.SetStateAction<any>>;
  selectedTest: string | null;
  selectedNumericalTest: string | null;
};

function TestComponent({
  setSelectedTest,
  setSelectedNumericalTest,
  setShowTests,
  setWeatherData,
  selectedTest,
  selectedNumericalTest,
}: Props) {
  return (
    <div className="w-screen h-screen bg-white absolute top-0 left-0 text-black">
      <h1 className="text-6xl font-bold absolute top-20 left-1/2 -translate-x-1/2">
        Tests
      </h1>

      <div className="flex flex-col items-center justify-center mt-48">
        <div className="testsBox">
          {testCodes.map((test, index) => (
            <div key={index} className="test">
              <input
                type="radio"
                id={`test${test}`}
                name="test"
                value={test}
                onChange={(e) => setSelectedTest(e.target.value)}
              />
              <label className="p-2" htmlFor={`test${test}`}>
                {test}
              </label>
            </div>
          ))}
        </div>
        <div>
          <select
            value={selectedTest || ""}
            onChange={(e) => setSelectedNumericalTest(e.target.value)}
          >
            <option value="">Select Test Code</option>
            {numericalCodes.map((code, index) => (
              <option key={index} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button
          onClick={() => {
            setShowTests(false);
            setWeatherData((prevWeatherData: any) => ({
              ...prevWeatherData,
              weather: [
                {
                  ...prevWeatherData.weather[0],
                  id: selectedNumericalTest
                    ? selectedNumericalTest
                    : prevWeatherData.weather[0].id,
                  icon: selectedTest
                    ? selectedTest
                    : prevWeatherData.weather[0].icon,
                },
                ...prevWeatherData.weather,
              ],
            }));
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default TestComponent;
