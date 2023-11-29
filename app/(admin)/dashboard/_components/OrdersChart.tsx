"use client"

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  pending: number;
  delivered: number;
  canceled: number;
}

const OrdersChart = ({ pending, delivered, canceled }: Props) => {
  const data = [
    { label: "pending", value: pending },
    { label: "delivered", value: delivered },
    { label: "canceled", value: canceled },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60} style={{ fill: '#f33d58' }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default OrdersChart 