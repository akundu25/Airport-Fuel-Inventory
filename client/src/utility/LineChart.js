import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({
	labels,
	label,
	dataset,
	borderColor,
	backgroundColor,
}) => {
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
				suggestedMax: 50000,
			},
		},
	};

	return <Line data={data} options={options} />;
};

export default LineChart;
