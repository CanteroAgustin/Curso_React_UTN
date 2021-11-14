import styles from './App.module.css';
import WrapComponent from './components/WrapComponent';
import StoreProvider from './stores/StoreProvider';

const App = () => {

  return (
    <div className={styles.App}>
      <StoreProvider>
        <WrapComponent></WrapComponent>
      </StoreProvider>
    </div>
  );
}

export default App;
