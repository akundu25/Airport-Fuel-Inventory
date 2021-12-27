import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PieChart = ({ labels, label, dataset, borderColor, backgroundColor }) => {
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
	return <Pie data={data} />;
};

export default PieChart;
