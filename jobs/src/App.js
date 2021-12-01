import { AddJobForm } from './components/AddJobForm';
import { JobsList } from './components/JobsList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <AddJobForm />
      <JobsList />
    </div>
  );
}

export default App;
