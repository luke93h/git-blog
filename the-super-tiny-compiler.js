'use strict';

/**
 * TTTTTTTTTTTTTTTTTTTTTTTHHHHHHHHH     HHHHHHHHHEEEEEEEEEEEEEEEEEEEEEE
 * T:::::::::::::::::::::TH:::::::H     H:::::::HE::::::::::::::::::::E
 * T:::::::::::::::::::::TH:::::::H     H:::::::HE::::::::::::::::::::E
 * T:::::TT:::::::TT:::::THH::::::H     H::::::HHEE::::::EEEEEEEEE::::E
 * TTTTTT  T:::::T  TTTTTT  H:::::H     H:::::H    E:::::E       EEEEEE
 *         T:::::T          H:::::H     H:::::H    E:::::E
 *         T:::::T          H::::::HHHHH::::::H    E::::::EEEEEEEEEE
 *         T:::::T          H:::::::::::::::::H    E:::::::::::::::E
 *         T:::::T          H:::::::::::::::::H    E:::::::::::::::E
 *         T:::::T          H::::::HHHHH::::::H    E::::::EEEEEEEEEE
 *         T:::::T          H:::::H     H:::::H    E:::::E
 *         T:::::T          H:::::H     H:::::H    E:::::E       EEEEEE
 *       TT:::::::TT      HH::::::H     H::::::HHEE::::::EEEEEEEE:::::E
 *       T:::::::::T      H:::::::H     H:::::::HE::::::::::::::::::::E
 *       T:::::::::T      H:::::::H     H:::::::HE::::::::::::::::::::E
 *       TTTTTTTTTTT      HHHHHHHHH     HHHHHHHHHEEEEEEEEEEEEEEEEEEEEEE
 *
 *    SSSSSSSSSSSSSSS UUUUUUUU     UUUUUUUUPPPPPPPPPPPPPPPPP   EEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR
 *  SS:::::::::::::::SU::::::U     U::::::UP::::::::::::::::P  E::::::::::::::::::::ER::::::::::::::::R
 * S:::::SSSSSS::::::SU::::::U     U::::::UP::::::PPPPPP:::::P E::::::::::::::::::::ER::::::RRRRRR:::::R
 * S:::::S     SSSSSSSUU:::::U     U:::::UUPP:::::P     P:::::PEE::::::EEEEEEEEE::::ERR:::::R     R:::::R
 * S:::::S             U:::::U     U:::::U   P::::P     P:::::P  E:::::E       EEEEEE  R::::R     R:::::R
 * S:::::S             U:::::U     U:::::U   P::::P     P:::::P  E:::::E               R::::R     R:::::R
 *  S::::SSSS          U:::::U     U:::::U   P::::PPPPPP:::::P   E::::::EEEEEEEEEE     R::::RRRRRR:::::R
 *   SS::::::SSSSS     U:::::U     U:::::U   P:::::::::::::PP    E:::::::::::::::E     R:::::::::::::RR
 *     SSS::::::::SS   U:::::U     U:::::U   P::::PPPPPPPPP      E:::::::::::::::E     R::::RRRRRR:::::R
 *        SSSSSS::::S  U:::::U     U:::::U   P::::P              E::::::EEEEEEEEEE     R::::R     R:::::R
 *             S:::::S U:::::U     U:::::U   P::::P              E:::::E               R::::R     R:::::R
 *             S:::::S U::::::U   U::::::U   P::::P              E:::::E       EEEEEE  R::::R     R:::::R
 * SSSSSSS     S:::::S U:::::::UUU:::::::U PP::::::PP          EE::::::EEEEEEEE:::::ERR:::::R     R:::::R
 * S::::::SSSSSS:::::S  UU:::::::::::::UU  P::::::::P          E::::::::::::::::::::ER::::::R     R:::::R
 * S:::::::::::::::SS     UU:::::::::UU    P::::::::P          E::::::::::::::::::::ER::::::R     R:::::R
 *  SSSSSSSSSSSSSSS         UUUUUUUUU      PPPPPPPPPP          EEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR
 *
 * TTTTTTTTTTTTTTTTTTTTTTTIIIIIIIIIINNNNNNNN        NNNNNNNNYYYYYYY       YYYYYYY
 * T:::::::::::::::::::::TI::::::::IN:::::::N       N::::::NY:::::Y       Y:::::Y
 * T:::::::::::::::::::::TI::::::::IN::::::::N      N::::::NY:::::Y       Y:::::Y
 * T:::::TT:::::::TT:::::TII::::::IIN:::::::::N     N::::::NY::::::Y     Y::::::Y
 * TTTTTT  T:::::T  TTTTTT  I::::I  N::::::::::N    N::::::NYYY:::::Y   Y:::::YYY
 *         T:::::T          I::::I  N:::::::::::N   N::::::N   Y:::::Y Y:::::Y
 *         T:::::T          I::::I  N:::::::N::::N  N::::::N    Y:::::Y:::::Y
 *         T:::::T          I::::I  N::::::N N::::N N::::::N     Y:::::::::Y
 *         T:::::T          I::::I  N::::::N  N::::N:::::::N      Y:::::::Y
 *         T:::::T          I::::I  N::::::N   N:::::::::::N       Y:::::Y
 *         T:::::T          I::::I  N::::::N    N::::::::::N       Y:::::Y
 *         T:::::T          I::::I  N::::::N     N:::::::::N       Y:::::Y
 *       TT:::::::TT      II::::::IIN::::::N      N::::::::N       Y:::::Y
 *       T:::::::::T      I::::::::IN::::::N       N:::::::N    YYYY:::::YYYY
 *       T:::::::::T      I::::::::IN::::::N        N::::::N    Y:::::::::::Y
 *       TTTTTTTTTTT      IIIIIIIIIINNNNNNNN         NNNNNNN    YYYYYYYYYYYYY
 *
 *         CCCCCCCCCCCCC     OOOOOOOOO     MMMMMMMM               MMMMMMMMPPPPPPPPPPPPPPPPP   IIIIIIIIIILLLLLLLLLLL             EEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR
 *      CCC::::::::::::C   OO:::::::::OO   M:::::::M             M:::::::MP::::::::::::::::P  I::::::::IL:::::::::L             E::::::::::::::::::::ER::::::::::::::::R
 *    CC:::::::::::::::C OO:::::::::::::OO M::::::::M           M::::::::MP::::::PPPPPP:::::P I::::::::IL:::::::::L             E::::::::::::::::::::ER::::::RRRRRR:::::R
 *   C:::::CCCCCCCC::::CO:::::::OOO:::::::OM:::::::::M         M:::::::::MPP:::::P     P:::::PII::::::IILL:::::::LL             EE::::::EEEEEEEEE::::ERR:::::R     R:::::R
 *  C:::::C       CCCCCCO::::::O   O::::::OM::::::::::M       M::::::::::M  P::::P     P:::::P  I::::I    L:::::L                 E:::::E       EEEEEE  R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM:::::::::::M     M:::::::::::M  P::::P     P:::::P  I::::I    L:::::L                 E:::::E               R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM:::::::M::::M   M::::M:::::::M  P::::PPPPPP:::::P   I::::I    L:::::L                 E::::::EEEEEEEEEE     R::::RRRRRR:::::R
 * C:::::C              O:::::O     O:::::OM::::::M M::::M M::::M M::::::M  P:::::::::::::PP    I::::I    L:::::L                 E:::::::::::::::E     R:::::::::::::RR
 * C:::::C              O:::::O     O:::::OM::::::M  M::::M::::M  M::::::M  P::::PPPPPPPPP      I::::I    L:::::L                 E:::::::::::::::E     R::::RRRRRR:::::R
 * C:::::C              O:::::O     O:::::OM::::::M   M:::::::M   M::::::M  P::::P              I::::I    L:::::L                 E::::::EEEEEEEEEE     R::::R     R:::::R
 * C:::::C              O:::::O     O:::::OM::::::M    M:::::M    M::::::M  P::::P              I::::I    L:::::L                 E:::::E               R::::R     R:::::R
 *  C:::::C       CCCCCCO::::::O   O::::::OM::::::M     MMMMM     M::::::M  P::::P              I::::I    L:::::L         LLLLLL  E:::::E       EEEEEE  R::::R     R:::::R
 *   C:::::CCCCCCCC::::CO:::::::OOO:::::::OM::::::M               M::::::MPP::::::PP          II::::::IILL:::::::LLLLLLLLL:::::LEE::::::EEEEEEEE:::::ERR:::::R     R:::::R
 *    CC:::::::::::::::C OO:::::::::::::OO M::::::M               M::::::MP::::::::P          I::::::::IL::::::::::::::::::::::LE::::::::::::::::::::ER::::::R     R:::::R
 *      CCC::::::::::::C   OO:::::::::OO   M::::::M               M::::::MP::::::::P          I::::::::IL::::::::::::::::::::::LE::::::::::::::::::::ER::::::R     R:::::R
 *         CCCCCCCCCCCCC     OOOOOOOOO     MMMMMMMM               MMMMMMMMPPPPPPPPPP          IIIIIIIIIILLLLLLLLLLLLLLLLLLLLLLLLEEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRR
 *
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 * =======================================================================================================================================================================
 */

/**
 * 今天我们将一起来写一个编译器。但这并不是一个普通的编译器...而是一个非常非常非常小的编译器。
 * 小到什么成都呢？如果你把这个文件里的注释删掉，它将只剩下200行不到。
 * 
 * 我们将会把一些用lisp语法编写的函数，转化为符合c语言语法的函数。
 * 
 * 如果你并不熟悉这两种语法，我会给你一个简单的介绍。
 *
 * 如果我们有两个函数，可用于相加和相减，那么它们将会是这样的。
 *
 *                  LISP                      C
 *
 *   2 + 2          (add 2 2)                 add(2, 2)
 *   4 - 2          (subtract 4 2)            subtract(4, 2)
 *   2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
 *
 * 很简单吧？
 * 
 * 非常好，因为这正是我们所要编译的。尽管这并不是完整的lisp语法或者c语法，但这已经足够
 * 用于理解当下主流的编译器的原理了。
 */

/**
 * 大多数编译器可以分解为三个步骤：解析，转化，生成。
 * 
 * 1.解析：将代码字符串解析成抽象语法树
 * 
 * 2.变换：转换抽象语法树
 * 
 * 3.生成：根据变换后的抽象语法树再生成代码字符串
 */

/**
 * 解析
 * -------
 *
 * 解析可以分解为两个步骤：词汇分析、语法分析
 * 
 * 1. 词汇分析：通过一个词法分析器（tokenizer），原始的代码可以被分解进tokens
 * 
 *    Tokens是一个数组，里面有各种描述语法特征的小对象。它们可以是数字，标签，标点符号，
 *    运算符或者其他任何东西。
 *
 * 2. 语法分析：接受tokens，并将它们转化为一种可以描述语法和相互之间的关系的呈现方式。
 *    这通常被称为中间表达或者抽象语法树（AST）。
 *
 *    抽象语法树，是一个嵌套很深的对象，这是一种比较容易呈现代码的方式，并且能告诉我们很多
 *    信息。
 * 
 * 转换下面这样的语法：
 *
 *   (add 2 (subtract 4 2))
 *
 * Tokens 会是如此:
 *
 *   [
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'add'      },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'subtract' },
 *     { type: 'number', value: '4'        },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: ')'        },
 *     { type: 'paren',  value: ')'        },
 *   ]
 *
 * 抽象语法树会是如此：
 *
 *   {
 *     type: 'Program',
 *     body: [{
 *       type: 'CallExpression',
 *       name: 'add',
 *       params: [{
 *         type: 'NumberLiteral',
 *         value: '2',
 *       }, {
 *         type: 'CallExpression',
 *         name: 'subtract',
 *         params: [{
 *           type: 'NumberLiteral',
 *           value: '4',
 *         }, {
 *           type: 'NumberLiteral',
 *           value: '2',
 *         }]
 *       }]
 *     }]
 *   }
 */

/**
 * 转化
 * --------------
 *
 * 编译器的下一步将会是转化。它只是把AST从最近的步骤那边拿过来，然后做了一些修改。
 * 它可以在同语言基础上修改AST，也可以将AST转化为一种全新的语言。
 * 
 * 让我们来看下如何转化一个AST
 *
 * 或许你已经注意到了，我们的AST只有一个元素，这使得它显得非常简单。这里有几个对象，各自
 * 有不同的属性。它们每一个都是一个AST节点。这些节点上有一些定义了属性，用于描述树上某一
 * 个独立的部分。
 *
 * 这里有一个数字节点
 *
 *   {
 *     type: 'NumberLiteral',
 *     value: '2',
 *   }
 *
 * 这里有一个函数节点
 *
 *   {
 *     type: 'CallExpression',
 *     name: 'subtract',
 *     params: [...nested nodes go here...],
 *   }
 *
 * 当转换AST时，我们通过新增/移除/替换的方式，可以添加新的节点，移除节点，或者我们可以
 * 旧的AST不管，直接生成一个全新的AST.
 *
 * 因为我们的目标是新的语言，所以我们将会生成一个针该改语言的全新的AST。
 *
 * 遍历
 * ---------
 *
 * 为了处理所有的节点，我们需要遍历它们。遍历会优先深度。
 *
 *   {
 *     type: 'Program',
 *     body: [{
 *       type: 'CallExpression',
 *       name: 'add',
 *       params: [{
 *         type: 'NumberLiteral',
 *         value: '2'
 *       }, {
 *         type: 'CallExpression',
 *         name: 'subtract',
 *         params: [{
 *           type: 'NumberLiteral',
 *           value: '4'
 *         }, {
 *           type: 'NumberLiteral',
 *           value: '2'
 *         }]
 *       }]
 *     }]
 *   }
 *
 * 对于上面的节点树：
 *
 *   1. Program - 从AST的顶部开始
 *   2. CallExpression (add) -到了Program的第一个节点
 *   3. NumberLiteral (2) - 到了CallExpression的第一个参数
 *   4. CallExpression (subtract) - 到了CallExpression的第二个参数
 *   5. NumberLiteral (4) - 到了CallExpression的第一个参数
 *   6. NumberLiteral (2) - 到了CallExpression的第二个参数
 *
 * 如果我们直接操作AST,而不是创建一个独立的AST,我们可能会介绍所有种类的抽象，但是目前
 * 访问所有节点的方法已经够用了。
 *
 * 之所以我要使用“访问”这个词，是因为这里有一种模式，它展示如何去操作对象结构
 * The reason I use the word "visiting" is because there is this pattern of how
 * to represent operations on elements of an object structure.
 *
 * Visitors
 * --------
 *
 * 最基本的想法是，创建一个visitor对象，它有一些方法可以用来接受不同的节点类型。
 *
 *   var visitor = {
 *     NumberLiteral() {},
 *     CallExpression() {},
 *   };
 *
 * 遍历AST时，我们将会调用visitor的这些方法去处理对应的节点类型。
 * When we traverse our AST, we will call the methods on this visitor whenever we
 * "enter" a node of a matching type.
 *
 * 为了更好用，我们会传入节点和父节点的引用。
 *
 *   var visitor = {
 *     NumberLiteral(node, parent) {},
 *     CallExpression(node, parent) {},
 *   };
 *
 * 但是，依旧存在一种可能性--在退出时调用函数。想象一下，我们之前的树结构转化列表的形式：
 *
 *   - Program
 *     - CallExpression
 *       - NumberLiteral
 *       - CallExpression
 *         - NumberLiteral
 *         - NumberLiteral
 *
 * 向下遍历时，我们会到达一些分支的尽头。当到达一些分支的尽头时，我们将退出。所以向
 * 下走，我们进入节点，往回走我们会退出。
 *
 *   -> Program (enter)
 *     -> CallExpression (enter)
 *       -> Number Literal (enter)
 *       <- Number Literal (exit)
 *       -> Call Expression (enter)
 *          -> Number Literal (enter)
 *          <- Number Literal (exit)
 *          -> Number Literal (enter)
 *          <- Number Literal (exit)
 *       <- CallExpression (exit)
 *     <- CallExpression (exit)
 *   <- Program (exit)
 *
 * 为了支持这种方式，最终的visitor会是这样的：
 *
 *   var visitor = {
 *     NumberLiteral: {
 *       enter(node, parent) {},
 *       exit(node, parent) {},
 *     }
 *   };
 */

/**
 * 代码生成
 * ---------------
 *
 * 编译器的最后一个阶段是生成代码。有时候编译器会做些和转化阶段重复的事情，但是大多数的
 * 代码生成还是在AST阶段的。
 *
 * 代码生成步骤用好几种实现方式，有一些编译器会重复利用之前的tokens，其它的则会生成
 * 一套独立的代码表达方式，从而它们能够线性生成代码，但是我能确定的是，大多数会使用
 * 我们刚刚生成的AST，这也是我们接下来要用到的。
 *
 * 我们的代码生成器会有效的知道如何“打印”各种不同类型的AST节点，并且它会递归调用自己去
 * 打印嵌套的节点，知道所有的代码被打印成一串很长的字符串。
 */

/**
 * 这就是它了！那已经是编译器里面所有的不同点了。
 *
 * 现在还不能说所有的编译器的工作原理就像是我所描述的这样。
 * 编译器有很多的目的，因此相比于我所描述的，它们可能需要更多的步骤。
 *
 * 但是你现在应该对大多数的编译器的架构有了一个大致的了解。
 *
 * 既然我已经介绍了这么多了，你已经做好准备去编写一个属于你自己的编译器了吗？
 *
 * 哈哈，只是开玩笑，接下来让我们一起来解析下方编译器的源码 :P
 *
 * 准备开始吧...
 */

/**
 * ============================================================================
 *                                   (/^▽^)/
 *                                THE TOKENIZER!
 * ============================================================================
 */

/**
 * 首先开始的是词汇分析，这一步骤我们将借助tokenizer
 *
 * 我们将会接受代码字符串，并将它们分解为token数组
 *
 *   (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 */
// 从接受一段代码字符串开始，我们先先做两件事
function tokenizer(input) {

  // 'current'变量用于定位位置
  let current = 0;

  // `tokens`数组用于保存token
  let tokens = [];

  // 遍历字符串
  while (current < input.length) {

    // 获取字符
    let char = input[current];

    // 检查圆括号
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '(',
      });
      current++;
      continue;
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      });
      current++;
      continue;
    }

    // 空格无关紧要
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // 接下来是数组。这里有些不一样，因为我们希望能获取整串数字作为一个token。如下所示
    //
    //   (add 123 456)
    //        ^^^ ^^^
    //        这里应该只有两个token
    //
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {

      let value = '';

      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'number', value });
      continue;
    }

    // 字符串同上
    //
    //   (concat "foo" "bar")
    //            ^^^   ^^^ string tokens
    if (char === '"') {
      let value = '';

      char = input[++current];
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      char = input[++current];
      tokens.push({ type: 'string', value });

      continue;
    }

    // 变量或关键字，同上
    //
    //   (add 2 4)
    //    ^^^
    //    Name token
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'name', value });

      continue;
    }
    throw new TypeError('I dont know what this character is: ' + char);
  }
  return tokens;
}

/**
 * ============================================================================
 *                                 ヽ/❀o ل͜ o\ﾉ
 *                                THE PARSER!!!
 * ============================================================================
 */

/**
 * 接下来我们会把tokens数组转化为AST对象
 *
 *   [{ type: 'paren', value: '(' }, ...]   =>   { type: 'Program', body: [...] }
 */
function parser(tokens) {
  let current = 0;

  // walk是一个递归函数
  function walk() {

    // 获取当前token
    let token = tokens[current];

    // 数字类型
    if (token.type === 'number') {
      current++;
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }

    // 字符串类型
    if (token.type === 'string') {
      current++;

      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    if (
      token.type === 'paren' &&
      token.value === '('
    ) {
      token = tokens[++current];
      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };
      token = tokens[++current];

      // 递归，找到函数的所有作为函数参数的token，以下面这个函数为例
      //
      //   (add 2 (subtract 4 2))
      //
      // 在tokens数组中会遇到多个闭合圆括号
      //
      //   [
      //     { type: 'paren',  value: '('        },
      //     { type: 'name',   value: 'add'      },
      //     { type: 'number', value: '2'        },
      //     { type: 'paren',  value: '('        },
      //     { type: 'name',   value: 'subtract' },
      //     { type: 'number', value: '4'        },
      //     { type: 'number', value: '2'        },
      //     { type: 'paren',  value: ')'        }, <<< Closing parenthesis
      //     { type: 'paren',  value: ')'        }, <<< Closing parenthesis
      //   ]
      //
      // 递归walk，知道遇到闭合圆括号才跳出walk

      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        // walk返回值为函数的参数节点
        node.params.push(walk());
        token = tokens[current];
      }
      current++;
      return node;
    }

    //没有找到匹配类型，报错
    throw new TypeError(token.type);
  }

  // 拥有program顶节点的AST
  let ast = {
    type: 'Program',
    body: [],
  };

  // 触发walk
  //
  // 这样是因为函数可能是平级的，并不是嵌套关系，如下所示
  //
  //   (add 2 2)
  //   (subtract 4 2)
  //
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

/**
 * ============================================================================
 *                                 ⌒(❀>◞౪◟<❀)⌒
 *                                      转换器!!!
 * ============================================================================
 */

/**
 * 遍历抽象语法树(AST)时，转换对应的节点
 *
 *   traverse(ast, {
 *     Program: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *
 *     CallExpression: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *
 *     NumberLiteral: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *   });
 */

// 定义traverser函数
function traverser(ast, visitor) {

  // 用traverseNode遍历数组
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }
  // 接受两个参数，node, parent
  function traverseNode(node, parent) {

    // 获得对应节点类型的方法
    let methods = visitor[node.type];

    // 调用对应方法的enter
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    // 区分节点类型，做不同处理
    switch (node.type) {

      case 'Program':
        traverseArray(node.body, node);
        break;

      case 'CallExpression':
        traverseArray(node.params, node);
        break;

      // 数字和字符串没有子节点，跳过
      case 'NumberLiteral':
      case 'StringLiteral':
        break;

      // 没有找到对应类型，报错
      default:
        throw new TypeError(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  // 启动traverseNode
  traverseNode(ast, null);
}

/**
 * ============================================================================
 *                                   ⁽(◍˃̵͈̑ᴗ˂̵͈̑)⁽
 *                                    转换器!!!
 * ============================================================================
 */

/**
 * 生成一个新的AST
 *
 * ----------------------------------------------------------------------------
 *   原始的 AST                     |   转换后的 AST
 * ----------------------------------------------------------------------------
 *   {                                |   {
 *     type: 'Program',               |     type: 'Program',
 *     body: [{                       |     body: [{
 *       type: 'CallExpression',      |       type: 'ExpressionStatement',
 *       name: 'add',                 |       expression: {
 *       params: [{                   |         type: 'CallExpression',
 *         type: 'NumberLiteral',     |         callee: {
 *         value: '2'                 |           type: 'Identifier',
 *       }, {                         |           name: 'add'
 *         type: 'CallExpression',    |         },
 *         name: 'subtract',          |         arguments: [{
 *         params: [{                 |           type: 'NumberLiteral',
 *           type: 'NumberLiteral',   |           value: '2'
 *           value: '4'               |         }, {
 *         }, {                       |           type: 'CallExpression',
 *           type: 'NumberLiteral',   |           callee: {
 *           value: '2'               |             type: 'Identifier',
 *         }]                         |             name: 'subtract'
 *       }]                           |           },
 *     }]                             |           arguments: [{
 *   }                                |             type: 'NumberLiteral',
 *                                    |             value: '4'
 * ---------------------------------- |           }, {
 *                                    |             type: 'NumberLiteral',
 *                                    |             value: '2'
 *                                    |           }]
 *  (sorry the other one is longer.)  |         }
 *                                    |       }
 *                                    |     }]
 *                                    |   }
 * ----------------------------------------------------------------------------
 */

function transformer(ast) {

  let newAst = {
    type: 'Program',
    body: [],
  };

  // 接下来我会用一些黑科技。在原来的父节点上新增一个context属性，正常情况下
  // 应该会有更好的抽象方法， 但这里从简处理。
  //
  // 注意到context是一个新AST的引用
  ast._context = newAst.body;

  traverser(ast, {

   // 数字
    NumberLiteral: {
      // We'll visit them on enter.
      enter(node, parent) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        });
      },
    },

    // 字符串
    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        });
      },
    },

    // 函数
    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name,
          },
          arguments: [],
        };

        // 接下来，我们将在原函数节点上上定义一个context，它将指向函数参数
        node._context = expression.arguments;

        // 判断父节点类型是否是函数
        // 如果不是...
        if (parent.type !== 'CallExpression') {

          // 用一个`ExpressionStatement`节点包装我们的`CallExpression`
          // 节点。这样做是因为JavaScript最顶层，一般就是表达式。
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          };
        }
        parent._context.push(expression);
      },
    }
  });

  return newAst;
}

/**
 * ============================================================================
 *                               ヾ（〃＾∇＾）ﾉ♪
 *                            THE CODE GENERATOR!!!!
 * ============================================================================
 */

/**
 * 代码生成器
 */

function codeGenerator(node) {

  // 根据节点类型区分
  switch (node.type) {

    // 递归
    case 'Program':
      return node.body.map(codeGenerator)
        .join('\n');

    // 对于`ExpressionStatement`，我们需要递归调用，并添加一个分号符号。
    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) +
        ';' // << (...因为我们希望能正确编码)
      );

    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator)
          .join(', ') +
        ')'
      );

    // 函数名
    case 'Identifier':
      return node.name;

    // 数字
    case 'NumberLiteral':
      return node.value;

    // 字符串
    case 'StringLiteral':
      return '"' + node.value + '"';

    // 未识别的节点
    default:
      throw new TypeError(node.type);
  }
}

/**
 * ============================================================================
 *                                  (۶* ‘ヮ’)۶”
 *                            !!!!!!!!编译器!!!!!!!!
 * ============================================================================
 */

/**
 * 最终，我们终于完成了我们的编译器函数。下面展示了流程
 *
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   3. ast    => transformer => newAst
 *   4. newAst => generator   => output
 */

function compiler(input) {
  let tokens = tokenizer(input);
  let ast    = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);

  // 返回输出
  return output;
}

/**
 * ============================================================================
 *                                   (๑˃̵ᴗ˂̵)و
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!成功了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!s
 * ============================================================================
 */

// 输出所有模块
module.exports = {
  tokenizer,
  parser,
  traverser,
  transformer,
  codeGenerator,
  compiler,
};