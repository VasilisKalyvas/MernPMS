import './App.css';
import Layout from './components/Layout';
import { Routes as Switch, Route} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin';
import EditUser from './pages/EditUser';
import { AuthContextProvider } from './context/AuthContext';
import { ToastContextProvider } from './context/ToastContext';
import { AdminContextProvider } from './context/AdminContext';
import AllTasks from './pages/AllTasks';
import UserTasks from './pages/UserTasks';
import CreateUserTasks from './pages/CreateUserTasks';
import Profile from './pages/Profile';
import CreateProject from './pages/CreateProject';
import Projects from './pages/Projects';
import UsersList from './pages/UsersList';
import AddUserToProject from './pages/AddUserToProject';
import RemoveUserFromProject from './pages/RemoveUserFromProject';
import MyProjects from './pages/MyProjects';
import AddTask from './pages/AddTask';
import ProjectTasks from './pages/ProjectTasks';
import EditProject from './pages/EditProject';
import EditTask from './pages/EditTask';

function App() {
  return (
    <ToastContextProvider>
     <AuthContextProvider>
     <AdminContextProvider>
        <Layout>
          <Switch>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/edituser/:id" element={<EditUser/>}/>
            <Route path="/mytask" element={<AllTasks/>}/>
            <Route path="/usertasks/:id" element={<UserTasks/>}/>
            <Route path="/createusertasks/:id" element={<CreateUserTasks/>}/>
            <Route path="/project" element={<CreateProject/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/userslist" element={<UsersList/>}/>
            <Route path="/addusertoproject/:id" element={<AddUserToProject/>}/>
            <Route path="/removeusertoproject/:id" element={<RemoveUserFromProject/>}/>
            <Route path="/myprojects" element={<MyProjects/>}/>
            <Route path="/addtasktoproject/:id" element={<AddTask/>}/>
            <Route path="/projecttasks/:id" element={<ProjectTasks/>}/>
            <Route path="/project/:id" element={<ProjectTasks/>}/>
            <Route path="/editproject/:id" element={<EditProject/>}/>
            <Route path="/edittask/:id" element={<EditTask/>}/>
          </Switch>
         </Layout>
        </AdminContextProvider>
      </AuthContextProvider>
   </ToastContextProvider>
  );
}

export default App;
