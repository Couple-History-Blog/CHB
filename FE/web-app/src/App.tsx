import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

// routing
import Routes from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Loader from 'ui-component/Loader';

import ThemeCustomization from 'themes';
import { dispatch } from 'store';
import { getMenu } from 'store/slices/menu';

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { UserInfoProvider } from 'views/chb/provider/UserInfoProvider';

// ==============================|| APP ||============================== //

const App = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const ownDispatches = useDispatch(); // useDispatch 훅을 사용하여 디스패치 함수를 가져옵니다.

    useEffect(() => {
        dispatch(getMenu()).then(() => {
            setLoading(true);
        });
    }, [ownDispatches]);

    if (!loading) return <Loader />;

    return (
        <ThemeCustomization>
            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider >
                            <UserInfoProvider >
                                <Routes />
                                <Snackbar />
                            </UserInfoProvider>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

export default App;
