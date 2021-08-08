import LoadingSpinner from 'react-spinners/ScaleLoader';

import colors from '../public/colors.json';

export default function Spinner({ size }) {
    return (
        <LoadingSpinner height={size} width={size / 9} color={colors.palette.secondary.light} loading={true} />
    );
}