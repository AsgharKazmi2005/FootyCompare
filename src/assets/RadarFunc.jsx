
import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default class RadarFunc extends PureComponent {
  
    render() {
      const { d, p1, p2 } = this.props;
      return (
        <ResponsiveContainer width="70%" height="70%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={d}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name={p1.playerName} dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name={p2.playerName} dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      );
    }
}