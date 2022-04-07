import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import { Button, Modal, Spin } from 'antd';
import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import Title from '../../foundation/components/Typography/Title';
import useDebounce from '../../foundation/hooks/useDebounce/useDebounce';
import useToggle from '../../foundation/hooks/useToggle/useToggle';
import ModalTodo from './partials/ModalTodo';
import TodoCard from './partials/TodoCard';
import styles from './Todolist.module.scss';
import { selectTodo, statusTodo } from './todolistSlice';

const defaultData = {
	id: null,
	title: null,
	description: null,
	status: 0,
	createdAt: null,
};

export function TodoList() {
	const todolist = useAppSelector(selectTodo);
	const status = useAppSelector(statusTodo);
	const [statusNumber, setStatusNumber] = useState(0);
	const [datamodal, setDatamodal] = useState(defaultData);

	const debouncedStatus = useDebounce(statusNumber, 800);

	const isLoading = status === 'loading';

	const initialToggle = false;
	const stateToggle = useToggle({
		initialToggle,
		initialState: {
			visible: false,
			data: defaultData,
		},
	});

	return (
		<Spin spinning={isLoading} size={'large'}>
			<section className={styles.container}>
				<div className={styles.headerContainer}>
					<img src={'/majoo_logo.png'} alt="logo" />
					<h1>Todolist</h1>
				</div>
				<div className={styles.color} />
				<div className={styles.color} />
				<div className={styles.color} />
				<div className={styles.btnContainer}>
					<div>
						<Button
							type="text"
							icon={<PlusCircleOutlined />}
							onClick={() => {
								stateToggle.toggle({
									visible: !initialToggle,
									data: defaultData,
								});
							}}
						>
							Tambah Todo
						</Button>
					</div>
					<div>
						<Button
							type={debouncedStatus === 0 ? 'primary' : 'text'}
							onClick={() => setStatusNumber(0)}
						>
							Pending
						</Button>
						<Button
							type={debouncedStatus === 1 ? 'primary' : 'text'}
							onClick={() => setStatusNumber(1)}
						>
							Selesai
						</Button>
					</div>
				</div>
				<div className={styles.cardContainer}>
					{todolist
						?.filter((todo) => todo.status === debouncedStatus)
						?.sort((a, b) => {
							if (debouncedStatus === 1) {
								return (
									Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
								);
							}
							return (
								Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
							);
						})

						?.map((item) => {
							return (
								<TodoCard
									data={item}
									onClick={() => {
										stateToggle.toggle({
											visible: !initialToggle,
											data: item,
										});
									}}
								/>
							);
						})}
				</div>
				<Modal
					title="Add/Update Todolist"
					onCancel={() => stateToggle.toggle({ visible: initialToggle })}
					width={600}
					centered
					footer={null}
					className={styles.contentModalHeader}
					{...stateToggle.state}
				>
					<ModalTodo
						onClose={() => stateToggle.toggle({ visible: initialToggle })}
						{...stateToggle.state}
					/>
				</Modal>
			</section>
		</Spin>
	);
}
