import { Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addTodo,
  removeTodoById,
  initiateTodoAsync,
  selectTodo,
  statusTodo
} from './todolistSlice';

export function TodoList() {
  const todolist = useAppSelector(selectTodo);
  const status = useAppSelector(statusTodo);
  const dispatch = useAppDispatch();

  const isLoading = status === 'loading'

  useEffect(() => {
    dispatch(initiateTodoAsync())
  }, [])
  
  

  return (
    <Spin spinning={isLoading} size={'large'}>
     
     {todolist?.map(item=>{
       return (
         <>    
         <div>{item.title}</div>
         <div>{item?.description}</div>
         <Button type='default' color='red' onClick={()=> dispatch(removeTodoById(item.id))}>
        Delete By Id
      </Button>
         </>
       )
     })}
    </Spin>
  );
}
