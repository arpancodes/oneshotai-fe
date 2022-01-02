import "chart.js/auto";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { API } from "../config/constants";

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
          (color) => `rgba(${color}, 0.5)`
        );
        data.datasets[0].borderColor = colors.map(
          (color) => `rgba(${color}, 1)`
        );
        setData(data);
        console.log(data);
        setLoading(false);
      });
  }, [resource]);

  if (isLoading) return "Loading...";

  return (
    <Doughnut
      data={data}
      options={{
        onClick: (e, item) => {
          console.log(data.labels[item[0].index], item[0].index);
          navigate(`/colleges?${resource}=${data.labels[item[0].index]}`);
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `By ${resource}`,
          },
        },
      }}
    />
  );
}

export default Plot;
