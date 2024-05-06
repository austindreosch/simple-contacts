import { db } from '@/assets/firebase';
import ImportContactsForm from '@/components/ImportContactsForm.vue';
import { mount } from '@vue/test-utils';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import Papa from 'papaparse';

const dataPerfect = [
    ['First Name', 'Last Name', 'Email', 'Note', 'Phone', 'Tags'],
    ['Megan', 'Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '8483396947', 'Wine Industry, Executive, Vineyard Buyer'],
];
const dataFullName = [
    ['Name', 'Email', 'Note', 'Phone', 'Tags'],
    ['Megan Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '8483396947', 'Wine Industry, Executive, Vineyard Buyer'],
];
const dataMissingEmail = [
    ['First Name', 'Last Name', 'Email', 'Note', 'Phone', 'Tags'],
    ['Megan', 'Smith', '', 'Vineyard Owner', '8483396947', 'Wine Industry, Executive, Vineyard Buyer'],
];
const dataPhoneNumbersTest = [
    ['First Name', 'Last Name', 'Email', 'Note', 'Phone', 'Tags'],
    ['Megan', 'Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '(848) 339-6947', 'Wine Industry, Executive, Vineyard Buyer'],
    ['Megan', 'Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '848-339-6947', 'Wine Industry, Executive, Vineyard Buyer'],
    ['Megan', 'Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '+1 848-339-6947', 'Wine Industry, Executive, Vineyard Buyer'],
    ['Megan', 'Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '+1 848 339 6947', 'Wine Industry, Executive, Vineyard Buyer'],
    ['Megan', 'Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '+22 (848) 339 6947', 'Wine Industry, Executive, Vineyard Buyer'],
    ['Megan', 'Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '(848) 339-6947', 'Wine Industry, Executive, Vineyard Buyer'],
    ['Megan', 'Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '848-339-6947', 'Wine Industry, Executive, Vineyard Buyer'],
    ['Megan', 'Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '+1 848-339-6947', 'Wine Industry, Executive, Vineyard Buyer'],
    ['Megan', 'Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '+1 848 339 6947', 'Wine Industry, Executive, Vineyard Buyer'],
    ['Megan', 'Smith', 'megan.smith@wineryvalley.net', 'Vineyard Owner', '+22 (848) 339 6947', 'Wine Industry, Executive, Vineyard Buyer'],
];

describe('processData', () => {
    it('correctly processes perfect CSV data', async () => {
      const result = await processData(dataPerfect);
      expect(result).toEqual([
        {
          email: 'megan.smith@wineryvalley.net',
          firstName: 'Megan',
          lastName: 'Smith',
          note: 'Vineyard Owner',
          phone: '8483396947',
          tags: ['Wine Industry', 'Executive', 'Vineyard Buyer'],
          userId: expect.any(String),
        },
      ]);
    });

    it('correctly processes CSV data with full name', async () => {
      const result = await processData(dataFullName);
      expect(result).toEqual([
        {
          email: 'megan.smith@wineryvalley.net',
          firstName: 'Megan',
          lastName: 'Smith',
          note: 'Vineyard Owner',
          phone: '8483396947',
          tags: ['Wine Industry', 'Executive', 'Vineyard Buyer'],
          userId: expect.any(String),
        },
      ]);
    })

    it('correctly processes CSV data with missing email', async () => {
        
    })

})