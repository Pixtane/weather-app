import testCodes from "../../public/testCodes.json";
import numericalCodes from "../../public/numericalCodes.json";

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
    <div className="w-screen h-screen fixed bg-black bg-opacity-40 backdrop-blur-2xl top-0 left-0 text-white">
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
            className="bg-transparent text-white"
            value={selectedTest || ""}
            onChange={(e) => setSelectedNumericalTest(e.target.value)}
          >
            <option className="bg-gray-800" value="">
              Select Test Code
            </option>
            {numericalCodes.map((code, index) => (
              <option className="bg-gray-800" key={index} value={code}>
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

      <div className="absolute bottom-0 w-screen flex justify-center">
        <div className="infoBox">
          <div className="infoValue">
            <div className="thanks">
              This app was made possible by{" "}
              <a href="https://openweathermap.org/">OpenWeatherMap</a> and{" "}
              <a href="https://www.geonames.org/">GeoNames</a>. <br />
              <a
                title="If places don't load, you can try going there and activating it."
                href="https://cors-anywhere.herokuapp.com/corsdemo"
              >
                Proxy url
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestComponent;
