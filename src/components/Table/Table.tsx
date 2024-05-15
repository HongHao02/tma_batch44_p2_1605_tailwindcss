import { Todo } from '../../types/Todo';
import { ImBin } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { MdOutlineDownloadDone } from 'react-icons/md';
import { removeTodo, toggleTodo } from '../../features/todolist/todoSlice';

interface DataTableProps {
    data: Todo[];
    status?: boolean;
}
const Table: React.FC<DataTableProps> = ({ data, status = false }) => {
    const dispatch = useDispatch();
    return (
        <table className="w-full bg-slate-600 rounded-md p-8 border-collapse">
            <tbody>
                <tr>
                    <th className="py-2 w-1/5 text-left ">Id</th>
                    <th className="py-2 w-3/5 text-left">Todo</th>
                    <th className="py-2 w-1/5 text-center">Remove</th>
                    <th className="py-2 w-1/5 text-center">Checked</th>
                </tr>
                {status
                    ? data.map((task, index) => (
                          <>
                              {task.completed && (
                                  <tr
                                      key={index}
                                      className={
                                          index % 2 === 0
                                              ? 'border-t-[1px] bg-slate-600'
                                              : 'border-t-[1px] bg-slate-400'
                                      }
                                  >
                                      <td className="py-2">{task.id}</td>
                                      <td className="py-2">{task.todo}</td>
                                      <td className="hover:bg-slate-500 hover:rounded-sm flex items-center justify-center py-4">
                                          <ImBin
                                              onClick={() => dispatch(removeTodo(task.id))}
                                              className="hover:cursor-pointer"
                                          ></ImBin>
                                      </td>
                                      <td className="py-2">
                                          <MdOutlineDownloadDone
                                              onClick={() => dispatch(toggleTodo(task.id))}
                                          ></MdOutlineDownloadDone>
                                      </td>
                                  </tr>
                              )}
                          </>
                      ))
                    : data.map((task, index) => (
                          <>
                              {!task.completed && (
                                  <tr
                                      key={index}
                                      className={
                                          index % 2 === 0
                                              ? 'border-t-[1px] bg-slate-600'
                                              : 'border-t-[1px] bg-slate-400'
                                      }
                                  >
                                      <td className="py-2">{task.id}</td>
                                      <td className="py-2">{task.todo}</td>
                                      <td className="hover:bg-slate-500 hover:rounded-sm flex items-center justify-center py-4">
                                          <ImBin
                                              onClick={() => dispatch(removeTodo(task.id))}
                                              className="hover:cursor-pointer"
                                          ></ImBin>
                                      </td>
                                      <td className="py-2">
                                          <MdOutlineDownloadDone
                                              onClick={() => dispatch(toggleTodo(task.id))}
                                          ></MdOutlineDownloadDone>
                                      </td>
                                  </tr>
                              )}
                          </>
                      ))}
            </tbody>
        </table>
    );
};

export default Table;
