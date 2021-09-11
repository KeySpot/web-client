import { useUser } from '@auth0/nextjs-auth0';
import HtmlBase from '../components/HtmlBase';

export default function Tutorial() {
  const { user, error, isLoading } = useUser();

  // if (!user) {

  // } else {

  // }

  return (
    <HtmlBase>

    </HtmlBase>
  );
}