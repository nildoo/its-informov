import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Colors from '../../../../Colors';

import Header from '../../../../Components/Header';
import ListInfo from '../../../../Components/List/ListInfo';
import { useLanguage } from '../../../../hooks/useLanguage'

import { AuthContext } from '../../../../Providers/Auth';

const Summary = () => {
  const { language } = useLanguage()
  const { user } = useContext(AuthContext);

  const [summarysContrato, setSummarysContrato] = useState([]);
  const [summarysCredito, setSummarysCredito] = useState([]);
  const [summarysAprovadosCliente, setSummarysAprovadosCliente] = useState([]);
  const [summarysAprovadosAguardando, setSummarysAprovadosAguardando] = useState([]);
  const [summarysEncaminhadosCliente, setSummarysEncaminhadosCliente] = useState([]);
  const [summarysExecutados, setSummarysExecutados] = useState([]);
  const [summarysRequisitados, setSummarysRequisitados] = useState([]);
  const [summarysReprovados, setSummarysReprovados] = useState([]);

  useEffect(() => {
    //filtrando por cada status
    if (user.info.summarys.data) {

      // console.log(user.info.summarys.data);


      const Contrato = user.info.summarys.data.filter(item => {
        return item.status == 'Contrato';
      });
      setSummarysContrato(Contrato);

      const Credito = user.info.summarys.data.filter(item => {
        return item.status == 'Crédito para o cliente';
      });
      setSummarysCredito(Credito);

      const aprovadosPeloCliente = user.info.summarys.data.filter(item => {
        return item.status == 'Aprovado pelo cliente - executado';
      });
      setSummarysAprovadosCliente(aprovadosPeloCliente);

      const aprovadosAguardando = user.info.summarys.data.filter(item => {
        return item.status == 'Aprovado pelo cliente – aguardando execução';
      });
      setSummarysAprovadosAguardando(aprovadosAguardando);

      const encaminhadosCliente = user.info.summarys.data.filter(item => {
        return item.status == 'Encaminhado ao cliente – aguardando aprovação';
      });
      setSummarysEncaminhadosCliente(encaminhadosCliente);

      const executados = user.info.summarys.data.filter(item => {
        return item.status == 'Executado pendente de aprovação';
      });
      setSummarysExecutados(executados);

      const requisitados = user.info.summarys.data.filter(item => {
        return item.status == 'Requisitado a Orçamentos';
      });
      setSummarysRequisitados(requisitados);

      const reprovados = user.info.summarys.data.filter(item => {
        return item.status == 'Reprovado';
      });
      setSummarysReprovados(reprovados);
    }
  }, []);

  return (
    <>
      <Header
        title={
          language === 'portuguese' ? 'Resumo financeiro' : 'Financial summary'
        }
      />
      <View style={Styles.SectionHeader}>
        <Text style={Styles.total}>Total</Text>
        <Text style={Styles.value}>R$ {user.info.summarys.total}</Text>
      </View>
      <ScrollView style={{ marginTop: -8 }}>
        {summarysAprovadosCliente.map((item, index) => (
          <ListInfo key={index} index={index} type="money" info={item} />
        ))}
        {summarysContrato.map((item, index) => (
          <ListInfo key={index} index={index} type="money" info={item} />
        ))}
        {summarysCredito.map((item, index) => (
          <ListInfo key={index} index={index} type="money" info={item} />
        ))}
        {summarysAprovadosAguardando.map((item, index) => (
          <ListInfo key={index} index={index} type="money" info={item} />
        ))}
        {summarysEncaminhadosCliente.map((item, index) => (
          <ListInfo key={index} index={index} type="money" info={item} />
        ))}
        {summarysExecutados.map((item, index) => (
          <ListInfo key={index} index={index} type="money" info={item} />
        ))}
        {summarysRequisitados.map((item, index) => (
          <ListInfo key={index} index={index} type="money" info={item} />
        ))}
        {summarysReprovados.map((item, index) => (
          <ListInfo key={index} index={index} type="money" info={item} />
        ))}
      </ScrollView>
    </>
  )
};

const Styles = StyleSheet.create({
  SectionHeader: {
    marginTop: -8,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: Colors.blueLight,
    alignItems: 'center',
  },
  total: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.white,
    fontFamily: 'Poppins Regular',
    marginBottom: 4,
  },
  value: {
    fontSize: 32,
    color: Colors.white,
    fontFamily: 'Poppins SemiBold',
    fontStyle: 'normal',
  },
});

export default Summary;
