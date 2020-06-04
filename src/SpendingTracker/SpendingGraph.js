import React, { Component } from 'react';
import PieChart from 'react-minimal-pie-chart';

class SpendingGraph extends Component {
  render() {
    const { categories } = this.props;
    /* eslint-disable */
    const colors = ['#8FD5A6', '#329F5B', '#0C8346', '#F0F7EE', '#177E89', '#A1D3B4', '#228E56', '#41959E'];
    return (
      <div>
        <PieChart
          labelPosition={50}
          data={categories.map((category, index) => ({
            title: category.name,
            value: category.total,
            color: colors[index]
          }))}
          label={({ data, dataIndex }) => data[dataIndex].title + ': ' + Math.round(data[dataIndex].percentage) + '%'}
          labelStyle={{
            fill: '#121212',
            fontFamily: 'Montserrat',
            fontSize: '3px',
            fontWeight: 'bold'
          }}
        />
      </div>
    );
  }
}
export default SpendingGraph;
