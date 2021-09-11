// import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
// import { useEffect } from 'react';

export default function requireLogin() {
    const router = useRouter();
    const { user, error, isLoading } = useUser();

    // useEffect(() => {
    //     if (!error && !isLoading && !user) {
    //         router.push('/api/auth/login');
    //     }
    // }, [user]);

    if (!error && !isLoading && !user) {
        router.push('/api/auth/login');
    }

    return { user, error, isLoading: isLoading || !user };
}