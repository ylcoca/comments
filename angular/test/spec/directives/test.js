describe('angularApp', function () {
  //beforeEach(module('comment'));
  beforeEach(module('commentList'));
  var $httpBackend, $rootScope, createController, authRequestHandler, compile, element, scope;


  beforeEach(inject(function ($compile, $rootScope, $injector) {
    scope = $rootScope.$new();
    compile = $compile;
  }));


  it('result pass', function () {

    expect(1 + 1).toEqual(3);
  });


  it('should render the comments', function () {

    var comments = [
      {'author': 'Santiago', 'msg': 'Msg 1', id: 1},
      {'author': 'Pablo', 'msg': 'Msg 2', id: 2}
    ];

    scope.comments = comments;
    element = angular.element('<comment-list comments="comments"></comment-list>');
    element = compile(element)(scope);

    scope.$digest();

    expect(element.find('comment-model').length).toBe(2);

  });


});
