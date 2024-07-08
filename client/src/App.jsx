import React, { useState, useEffect } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import MainLayout from './layouts/Mainlayout';
import NotFoundPage from './pages/NotFoundPage';
import ProjectPage, { projectLoader } from './pages/ProjectPage';
import AddProjectPage from './pages/AddProjectPage';
import EditProjectPage from './pages/EditProjectPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { toast } from 'react-toastify';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialPath, setInitialPath] = useState('/signin');

  const handleSignIn = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleSignUp = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const addProject = async (newProject) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      toast.success('Project created successfully');
      return data;
    } catch (error) {
      toast.error('Project creation unsuccessful');
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const updateProject = async (updatedProject) => {
    const token = localStorage.getItem('token');
    const idObject = updatedProject.find((item) => item.propName === 'id');
    const id = idObject ? idObject.value : null;

    if (id) {
      await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProject),
      });
    } else {
      console.error('Project ID not found');
    }
  };

  const deleteProject = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      setIsAuthenticated(true);
    }

    const savedPath = sessionStorage.getItem('savedPath');
    if (savedPath) {
      setInitialPath(savedPath);
      sessionStorage.removeItem('savedPath');
    }
  }, [isAuthenticated]);

  const handleNavigation = (path) => {
    sessionStorage.setItem('savedPath', path);
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/signin" replace />;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignInPage onSignIn={handleSignIn} />} />
        <Route path="/signup" element={<SignUpPage onSignUp={handleSignUp} />} />
        <Route path="/" element={<MainLayout isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}>
          <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/projects" element={<ProtectedRoute element={<ProjectsPage />} />} />
          <Route path="/add-project" element={<ProtectedRoute element={<AddProjectPage addProjectSubmit={addProject} />} />} />
          <Route path="/edit-projects/:id" element={<ProtectedRoute element={<EditProjectPage updateProjectSubmit={updateProject} />} />} loader={projectLoader} />
          <Route path="/projects/:id" element={<ProtectedRoute element={<ProjectPage deleteProject={deleteProject} />} />} loader={projectLoader} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  useEffect(() => {
    if (isAuthenticated && initialPath !== '/signin') {
      router.navigate(initialPath);
    }
  }, [isAuthenticated, initialPath]);

  return (
    <RouterProvider
      router={router}
      onNavigate={(location) => handleNavigation(location.pathname)}
    />
  );
};

export default App;
