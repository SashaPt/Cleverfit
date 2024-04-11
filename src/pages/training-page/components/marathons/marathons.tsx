import './marathons.scss';
import { Typography } from 'antd';
const { Title, Text } = Typography;

export const Marathons = () => (
    <div className='training-marathons'>
        <Title className='training-marathons-title' level={3}>
            В данный период
            <br /> ни&nbsp;один марафон не&nbsp;проводится
        </Title>
        <Text className='training-marathons-text'>
            Заглядывайте сюда почаще <br />и ваш первый марафон скоро начнётся.
        </Text>
    </div>
);
