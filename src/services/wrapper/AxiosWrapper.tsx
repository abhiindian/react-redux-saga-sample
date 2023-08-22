import { useAxiosLoader } from '../interceptors/axios-inceptors';

type AxiosWrapperProps = {
    children: any;
}
export default function AxiosWrapper(axiosWrapperProps: AxiosWrapperProps) {
    const { children } = axiosWrapperProps;
    useAxiosLoader();
    return children;
}