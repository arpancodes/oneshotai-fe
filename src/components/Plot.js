import "chart.js/auto";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { API } from "../config/constants";
import Loading from "./Loading";

function Plot({ resource }) {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const randomRGBColor = () => {
    return `${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}`;
  };

  useEffect(() => {
    fetch(`${API}/colleges/stats/${resource}`)
      .then((response) => response.json())
      .then((res) => {
        const data = {
          datasets: [{ label: `By ${resource}`, borderWidth: 1 }],
        };
        data.labels = res.data.colleges.map((college) => college._id);
        data.datasets[0].data = res.data.colleges.map(
          (college) => college.count
        );
        const colors = res.data.colleges.map((_) => randomRGBColor());
        data.datasets[0].backgroundColor = colors.map(
          (color) => `rgba(${color}, 0.6)`
        );
        setData(data);
        setLoading(false);
      });
  }, [resource]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-4/5 flex flex-col justify-center mx-auto items-center">
      <Doughnut
        data={data}
        options={{
          onClick: (e, item) => {
            navigate(`/colleges?${resource}=${data.labels[item[0].index]}`);
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
              text: `By ${resource}`,
            },
          },
        }}
      />
      <span className="mb-10 mt-3 capitalize text-2xl">By {resource}</span>
    </div>
  );
}

export default Plot;
