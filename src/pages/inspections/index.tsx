import { Box, Divider, Flex, Text, Button, Input, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../helpers/axios";

const Surveys: React.FC = () => {
  const [surveys, setSurveys] = useState([]);
  const [description, setDescription] = useState('');
  const [equipment, setEquipment] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  useEffect(() => {
    loadSurveys();
  }, []);

  const loadSurveys = async () => {
    try {
      const response = await api.get('/surveys', { withCredentials: true });
      if (response.status === 200) {
        setSurveys(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar as vistorias:', error);
    }
  };

  const handleCreateSurvey = async () => {
    try {
      const response = await api.post('/surveys', {
        description,
        equipment,
        date_start: dateStart,
        date_end: dateEnd,
      }, { withCredentials: true });
      if (response.status === 201) {
        loadSurveys();
      }
    } catch (error) {
      console.error('Erro ao criar vistoria:', error);
    }
  };

  const handleDeleteSurvey = async (id: number) => {
    try {
      const response = await api.delete(`/surveys/${id}`, { withCredentials: true });
      if (response.status === 204) {
        loadSurveys();
      }
    } catch (error) {
      console.error('Erro ao deletar vistoria:', error);
    }
  };

  return (
    <Flex
      as="main"
      bg="white"
      align="center"
      justify="space-between"
      flexDirection="column"
      position="relative"
      borderRadius="3xl"
      width="100%"
    >
      <Text fontSize={40} color="#377C2B" py={2}>
        Vistorias
      </Text>
      <Divider orientation='horizontal' />
      <Box py={4}>
        <FormControl>
          <FormLabel>Descrição</FormLabel>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Equipamento</FormLabel>
          <Select value={equipment} onChange={(e) => setEquipment(e.target.value)}>
            {/* Opções de equipamentos */}
          </Select>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Data de Início</FormLabel>
          <Input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Data de Término</FormLabel>
          <Input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
        </FormControl>
        <Button mt={4} colorScheme="green" onClick={handleCreateSurvey}>
          Criar Vistoria
        </Button>
      </Box>
      <Box overflowY="auto" height="100%">
        <TableContainer w={'150vh'}>
          <Table variant='simple' size={'sm'}>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Descrição</Th>
                <Th>Data de Início</Th>
                <Th>Data de Término</Th>
                <Th w={'205px'}>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {surveys.map((survey: any) => (
                <Tr key={survey.id}>
                  <Td>{survey.id}</Td>
                  <Td>{survey.description}</Td>
                  <Td>{survey.date_start}</Td>
                  <Td>{survey.date_end}</Td>
                  <Td>
                    <Button colorScheme="red" onClick={() => handleDeleteSurvey(survey.id)}>
                      Deletar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

export default Surveys;
