import {
	Button,
	Col,
	Divider,
	Input,
	notification,
	Radio,
	Row,
	Space,
	Spin,
} from 'antd';
import { Form, Formik } from 'formik';
import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import styles from '../Todolist.module.scss';
import {
	addTodo,
	removeTodoById,
	TodoType,
	updateTodo,
} from '../todolistSlice';

interface ModalTodoProps {
	onClose: () => void;
	data: TodoType;
}

function ModalTodo({ onClose, data }: ModalTodoProps) {
	const dispatch = useAppDispatch();

	return (
		<div className={styles.contentModal}>
			<div>
				<Formik
					enableReinitialize
					initialValues={data}
					onSubmit={(values, { setSubmitting }) => {
						console.log(values, 'values formik');
						try {
							if (data?.id) {
								dispatch(updateTodo(values));
							} else {
								dispatch(addTodo(values));
							}
						} catch (error) {
							notification.error({
								message: 'Error',
								description: 'Something Wrong!',
							});
						} finally {
							setSubmitting(false);
						}
						onClose();
					}}
				>
					{(formikProps) => {
						const {
							handleSubmit,
							isSubmitting,
							values,
							setFieldValue,
							handleReset,
						} = formikProps;
						return (
							<Spin spinning={isSubmitting} size="large">
								<Form onSubmit={handleSubmit}>
									<Row gutter={[24, 24]}>
										<Col sm={24} md={12}>
											<Input
												placeholder="Nama Task"
												onChange={(e) =>
													setFieldValue('title', e.target?.value)
												}
												value={values['title']}
											/>
										</Col>
										<Col sm={24} md={24}>
											<Input.TextArea
												placeholder="Deskripsi Task"
												rows={6}
												onChange={(e) =>
													setFieldValue('description', e.target?.value)
												}
												value={values['description']}
											/>
										</Col>
										{data?.id && (
											<Col sm={24} md={12}>
												<Radio.Group
													value={values.status}
													onChange={(e) =>
														setFieldValue('status', e.target?.value)
													}
												>
													<Radio value={0}>Pending</Radio>

													<Radio value={1}>Selesai</Radio>
												</Radio.Group>
											</Col>
										)}
									</Row>
									<Divider />
									<Row gutter={[24, 24]} align="middle" justify="end">
										<Space align="end" direction="horizontal">
											<Col xs={24}>
												<Button
													type="text"
													disabled={isSubmitting || data?.status === 0}
													onClick={() => {
														dispatch(removeTodoById(data?.id));
														onClose();
													}}
													style={{
														marginRight: '1rem',
														backgroundColor:
															data?.status === 0 ? 'grey' : '#ff7730',
														color: 'white',
													}}
												>
													Delete
												</Button>
												<Button
													type="primary"
													disabled={isSubmitting}
													loading={isSubmitting}
													onClick={() => {
														handleSubmit();
													}}
												>
													{Boolean(data?.id) ? 'Update' : 'Tambahkan'}
												</Button>
											</Col>
										</Space>
									</Row>
								</Form>
							</Spin>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}

export default ModalTodo;
