import React from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#0088FE", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const calcNumOfCompleted = (allTasks) => {
  let counter = 0;
  allTasks.map((val) => {
    if (val.status === "Completed") {
      counter += 1;
    }
  });
  return counter;
};

const Example = () => {
  const { allTasks } = useSelector((state) => state.tasks);

  let numOfCompletedTasks = calcNumOfCompleted(allTasks);
  let numOfNonCompletedTasks = Math.abs(
    numOfCompletedTasks -
      allTasks.filter((val) => {
        return val.status !== "---";
      }).length
  );

  const data = [
    { name: "Not Completed", value: numOfNonCompletedTasks },
    { name: "Completed", value: numOfCompletedTasks },
  ];
  return (
    <PieChart width={700} height={400}>
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};
export default Example;
