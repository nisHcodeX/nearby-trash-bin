const normalize = (v: number, v2: number) => Number.parseFloat(((v / v2) * 100).toFixed(2));

export const chartData = (data : {feedbacks: number, users: number, aBins: number, pBins: number, sBins: number, total: number}) => {
  console.log('data', data)
  return ([
    {
      label: 'Users',
      value: normalize(data.users, data.total),
    },
    {
      label: 'Active TrashBins',
      value: normalize(data.aBins, data.total),
    },
    {
      label: 'Suggested Trashbins',
      value: 3.83,
    },
    {
      label: 'Pending Trashbins',
      value: normalize(data.pBins, data.total),
    },
    {
      label: 'Feddbacks',
      value: normalize(data.feedbacks, data.total),
    },
  ])
};

export const valueFormatter = (item: { value: number }) => `${item.value}%`;