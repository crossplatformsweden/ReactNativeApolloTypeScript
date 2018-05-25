import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Setup enzyme's react adapter
// @ts-ignore
Enzyme.configure({ adapter: new Adapter() });
