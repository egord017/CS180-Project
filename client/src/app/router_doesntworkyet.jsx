import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Register from "@/components/Register";

function AppRouter(){
      const [isAuthenticated, setIsAuthenticated] = useState(false);
    
      const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
      };
    
      async function isAuth(){
        try {
          
          const response = await fetch("http://localhost:5000/auth/is-verify", {
            method: "GET",
            headers: {token: localStorage.token}
          });
    
          const parseResponse = await response.json();
    
          //console.log(parseResponse);
    
          if(parseResponse === true){
            setIsAuthenticated(true);
          } else{
            setIsAuthenticated(false);
          }
    
        } catch (err) {
          console.error(err.message);
        }
      }
    
      useEffect(() => {
        isAuth();
      })
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/"
                    element={<Navigate to="/login"/>}
                    />
                <Route 
                    path="/login"
                    element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/dashboard" />}
                />
                <Route 
                    path="/register" 
                    element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/dashboard" />}
                />
                <Route 
                    path="/dashboard" 
                    element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/login" />}
                />
            </Routes>
        </BrowserRouter>
    );

}

export default AppRouter