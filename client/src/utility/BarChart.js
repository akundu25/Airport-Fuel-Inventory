import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BarChart = ({ labels, label, dataset, borderColor, backgroundColor }) => {
	const data = {
		labels: labels,
		datasets: [
			{
				label,
				data: dataset,
				borderColor,
				backgroundColor,
			},
		],
	};

	const options = {
		scales: {
			y: {
				suggestedMin: 0,
				suggestedMax: 5,
			},
		},
		maintainAspectratio: false,
	};
	return <Bar data={data} options={options} />;
};

export default BarChart;
