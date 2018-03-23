import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('dotenv').load();

Enzyme.configure({ adapter: new Adapter() });
