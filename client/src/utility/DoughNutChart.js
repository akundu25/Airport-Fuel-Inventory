import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const DoughNutChart = ({
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
	return <Doughnut data={data} />;
};

export default DoughNutChart;
