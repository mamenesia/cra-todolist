import { Col, Row, Space } from 'antd';
import moment from 'moment';
import React from 'react';
import Text from '../../../foundation/components/Typography/Text';
import styles from '../Todolist.module.scss';
import { TodoType } from '../todolistSlice';

interface TodoCardProps {
	data: TodoType;
	onClick: () => void;
}

function TodoCard({ data, onClick }: TodoCardProps) {
	return (
		<div className={styles.todoCard} onClick={onClick}>
			<div>
				<Space direction="vertical" size="middle" style={{ width: '100%' }}>
					<Space size="large" direction="horizontal">
						<Text size={16} bold italic>
							{data?.title}
						</Text>
					</Space>
					<Space size="large" direction="horizontal">
						<Text size={16}>{data?.description}</Text>
					</Space>
				</Space>
			</div>
			<div>
				<div>
					<Row>
						<Col xs={24}>
							<Text size={16} color="#757575">
								{moment(data?.createdAt).format('DD MMMM YYYY hh:mm')}
							</Text>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
}

export default TodoCard;
