'use client'

import * as React from 'react';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'


const ChakraUIProviders = ({ children }: { children: React.ReactNode }) => {
    return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}

export default ChakraUIProviders;
