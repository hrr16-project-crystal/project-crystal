import { renderComponent, expect } from '../testHelper';
import Calendar from '../../components/Calendar/Calendar';

xdescribe('Calendar', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(Calendar);
  });

  it('should show a CreateEvent button', () => {
    expect(component.find('.center-align')).to.exist;
  });
});
