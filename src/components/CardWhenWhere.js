import dayjs from 'dayjs';
import { Card } from 'antd';

import { Form, Input, DatePicker } from 'antd';
import { useState } from 'react';

function CardWhenWhere({ tripProfile }) {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  let startTime, endTime;

  if (tripProfile?.trip_start_time) {
    startTime = dayjs.unix(tripProfile.trip_start_time);
  }
  if (tripProfile?.trip_end_time) {
    endTime = dayjs.unix(tripProfile.trip_end_time);
  }

  const origin = tripProfile?.origin.name;
  const destination = tripProfile?.destination.name;

  return (
    <Card type='inner' title='Where and when' bordered={false}>
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
      >
        <Form.Item label='Start and end date' required>
          <RangePicker value={[startTime, endTime]} />
        </Form.Item>
        <Form.Item label='Origin' required>
          <Input placeholder='input placeholder' value={origin} />
        </Form.Item>
        <Form.Item
          label='Destination'
          required
          tooltip='Only single destination is supported for V1'
        >
          <Input placeholder='input placeholder' value={destination} />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default CardWhenWhere;
