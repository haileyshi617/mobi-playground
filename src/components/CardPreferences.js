import { useState, useEffect } from 'react';

import { Card, Table, Tag } from 'antd';
import { excludeTags } from '../utils/ChatUtils';

function CardPreferences({ tripProfile }) {
  const included = tripProfile?.selected_filters
    ? excludeTags(tripProfile?.selected_filters)
    : [];
  const excluded = tripProfile?.excluded_filters
    ? excludeTags(tripProfile?.excluded_filters)
    : [];

  // TODO: add states to watch the changes
  // ? Where should we do the computation? Is this something the backend can support?
  const [tagCounts, setTagCounts] = useState(0);

  useEffect(() => {
    setTagCounts(included.length + excluded.length);
    console.log(tagCounts);
  });

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'include',
      key: 'include',
      render: (_, { include }) => (
        <>
          {include ? (
            <Tag color='blue'>Include</Tag>
          ) : (
            <Tag color='red'>Exclude</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag, idx) => {
            return <Tag key={idx}>{tag.name.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
  ];

  const data = [
    {
      key: 'experience-include',
      category: 'Experience',
      include: true,
      tags: included.filter((tag) => tag.category === 'EXPERIENCE'),
    },
    {
      key: 'experience-exclude',
      category: 'Experience',
      include: false,
      tags: excluded.filter((tag) => tag.category === 'EXPERIENCE'),
    },
    {
      key: 'dining-include',
      category: 'Dining',
      include: true,
      tags: included.filter((tag) => tag.category === 'DINING'),
    },

    {
      key: 'dining-exclude',
      category: 'Dining',
      include: false,
      tags: excluded.filter((tag) => tag.category === 'DINING'),
    },
  ];

  return (
    <Card title='Preferences'>
      <Table
        columns={columns}
        dataSource={data}
        bordered={false}
        pagination={false}
      />
    </Card>
  );
}

export default CardPreferences;
