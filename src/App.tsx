import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { WhatDoIHelp } from "./components/WhatDoIHelp";
import { Works } from "./components/Works";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect } from "react";
import ECDHKeyExchange from "./services/ECDHKeyExchangeService";

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  let keypairValue: CryptoKeyPair | null = null;
  let clientPublicKeyValue: ArrayBuffer | null = null;
  let serverPublicKeyValue: CryptoKey | null = null;
  let sharedKeyValue: CryptoKey | null = null;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest);
  });

  useEffect(() => {
    ECDHKeyExchange.generateKeyPair()
    .then((keypair) => {
      keypairValue = keypair;
      console.log("keypair", keypairValue);
      return keypair;
    })
    .then((keypair) => {
      return ECDHKeyExchange.exportPublicKey(keypair.publicKey);
    })
    .then((clientPublicKey) => {
      clientPublicKeyValue = clientPublicKey;
      console.log("clientPublicKey", clientPublicKeyValue);
      return ECDHKeyExchange.importPublicKey(clientPublicKey);
    })
    .then((serverPublicKey) => {
      serverPublicKeyValue = serverPublicKey;
      console.log("serverPublicKey", serverPublicKeyValue);
      return ECDHKeyExchange.deriveSharedKey(keypairValue!.privateKey, serverPublicKeyValue!);
    })
    .then((derivedSharedKey) => {
      sharedKeyValue = derivedSharedKey;
      console.log("derivedSharedKey", sharedKeyValue);
      return ECDHKeyExchange.encryptMessage(sharedKeyValue!, "Hello, world!");
    })
    .then(({ encrypted, iv }) => {
      console.log("encrypted", encrypted);
      return ECDHKeyExchange.decryptMessage(sharedKeyValue!, encrypted, iv as unknown as ArrayBuffer);
    })
    .then((decrypted) => {
      console.log("decrypted", decrypted);
      return decrypted;
    });
  });

  return (
    <div 
      className="min-h-screen flex flex-col lg:flex-col"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <Header />
      <div className="flex-1 min-w-0 flex flex-col lg:min-h-screen mx-[140px]">
        <Hero />
        <div className="z-0">
          <WhatDoIHelp />
          <Works />
          <Experience />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
