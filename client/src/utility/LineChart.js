import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({
	labels,
	label,
	dataset,
	borderColor,
	backgroundColor,
	pointBackgroundColor,
}) => {
	const data = {
		labels: labels,
		datasets: [
			{
				label,
				data: dataset,
				fill: true,
				borderColor,
				backgroundColor,
				pointBackgroundColor,
				tension: 0.5,
			},
		],
	};

	const options = {
		radius: 5,
		hitRadius: 40,
		hoverRadius: 10,
		scales: {
			y: {
				suggestedMin: 0,
				suggestedMax: 50000,
				ticks: {
					callback: function (value) {
						return value + ' L';
					},
				},
			},
		},
	};

	return <Line data={data} options={options} />;
};

export default LineChart;
