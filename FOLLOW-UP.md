# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?
tailwind: general styling
lodash: utility methods for sorting and filtering
I lifted the tailwind code for the `<Toggle>` from a blog

### Q) What libraries did you add to the backend? What are they used for?

### Q) Any other comments we should read before evaluating your solution?

I've could have used component libraries for the Toggle or RadioGroup such a React-Bootstrap or Material UI but I wanted to take the opportunity to explore Tailwind.

---

# General:

### Q) If you had more time, what further improvements or new features would you add?

There is no exception handling for the API call, introducing pagination for larger data sets.

The controls section could be polished a bit more for larger screens, perhaps style the RadioGroup a bit better.

`<Toogle>` and `<RadioGroup>` do not have a className prop to override styles so adding them for further reusability

Write unit tests for components and functions

### Q) Which parts are you most proud of? And why?

It's early days for me using Tailwind; I have been a sass / css modules dev for a long time and wanted to give it a try. I found it intuitive to use and fast. I like that one can see what is going on direclty on the component and there is no need of coming up with your own classNames.

### Q) Which parts did you spend the most time with? What did you find most difficult?

filters: I wanted something that is easily extensible:
- getting a suitable data structure for filter state management 
- find filter utility that goes along well with it. 

### Q) How did you find the test overall? Did you have any issues or have difficulties completing? If you have any suggestions on how we can improve the test, we'd love to hear them.

I think is a well balanced test. It's enough complexity and size to show the skill of the applicant but not too overwhelming. I did enjoy doing it.
