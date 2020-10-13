const sites = [
  {
    'code': '97542cba-e5d3-41fd-b990-46e9a4a5c5d4',
    'name': '東京 図書館',
    'category': 'ACG',
    'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASUlEQVQ4jWNkYGD4z0ABYKJEM1UMYPn/H7sPGBkZ4WxcaqjiAsq9QKxCZC/BwP///4k3ABYOjIyMKGEy8GEwBA1AT1RD0AvoAACTnxMcNsBFEAAAAABJRU5ErkJggg==',
    'target': 'SEARCH',
    'home': 'https://www.tokyotosho.info',
    'author': 'lanyuanxiaoyao',
    'description': 'A BitTorrent Library for Japanese Media',
    'parser': 'CSS',
    'downloader': 'HTTP',
    'charset': 'UTF-8',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    },
    'tags': {},
    'rules': {
      'https:\\/\\/www\\.tokyotosho\\.info\\/search\\.php\\?searchName=true&terms=.+&page=\\d+': {
        'list': {
          'expression': '#main > table.listing tr.category_0:has(.desc-top)',
          'title': {
            'expression': '.desc-top > a[rel=nofollow]'
          },
          'link': {
            'expression': '.web > a[rel=nofollow]',
            'attribute': 'href',
            'replace': [
              {
                'regex': '^',
                'text': 'https://www.tokyotosho.info/'
              }
            ]
          }
        },
        'next': {
          'replace': [],
          'script': 'var regex = /(.*)(\\d+)$/\nvar result = params.url.match(regex)\nif (result) {\n    return result[1] + (parseInt(result[2]) + 1)\n}\nreturn \'\''
        }
      },
      'https:\\/\\/www\\.tokyotosho\\.info\\/details\\.php\\?id=\\d+': {
        'text': {
          'expression': '#main > .details > ul',
          'title': {
            'expression': 'li.detailsleft:contains(Torrent Name) + li'
          },
          'author': {
            'expression': 'li.detailsleft:contains(Submitter) + li:has(a)',
            'replace': [
              {
                'regex': 'Search.+',
                'text': ''
              }
            ]
          },
          'dateTime': {
            'expression': 'li.detailsleft:contains(Date Submitted) + li'
          },
          'extra': {
            'size': {
              'expression': 'li.detailsleft:contains(Filesize) + li'
            }
          }
        },
        'list': {
          'expression': '#main > .details > ul',
          'title': {
            'expression': 'li.detailsleft:contains(Torrent Name) + li'
          },
          'content': {
            'expression': 'li:contains(Magnet Link) > a',
            'attribute': 'href'
          }
        }
      }
    },
    'search': 'https://www.tokyotosho.info/search.php?searchName=true&terms={query}&page=1'
  },
  {
    'code': '094ba8d8-e719-4ce1-8d79-9e6aab7c1cd6',
    'name': 'BT电影天堂',
    'category': '影视',
    'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACnUlEQVRYhe2XTUhUURTHf/e+aQx1NOxjNNHNICFIWWmtlAhq06ZI+rKgWhSEy8DChW0zjBYiFCVEiyhyVdEHiQujMimKgizSdAis1AQ/UOd9nBZPsWmGmmk+3PjfnXfPved3z7vn3PdUXv3kJZQ6BUqTRomIA1zxOKgDGrUsncEBlFKGiOxL666jQOhFBQBYAvD8bqzNVWwpjmSasYT+EeHTsKQWoLJYc+2QN6qjiND7XThz1+Rpv5MagHkN/HS4994NojXk+xTVAU1pvub2MS81bSGefXHHS1YrTm+PukxUXX1u0xNc2EDUmR9/CI0PzLBnvgy4ccRLVcCgYaeHXZdDAKzKUtSUxw7w6INDT3DBjnnmxCyc77CoChiUF2qUAhHoHnQobpwO892/0eDCbi9NT0xauqywsZlwM3YAgOEJ9xCaNjB3Hh2BqVC43+xckJAdOfan4irDsgLXvSfokKx6iBnA74OzOzyYttDcaf17QoyK+goKcxUHNxsAZHig1K/Zu8G1T94yeTGQ4jIsK9C01IT3A9MWbr6yCY4ltxlFBegbcbjzxgZAK8jLVGwq0hyuNKitMGjtsjj3MDmvISrA5xGhqSMyQFVAc73WS121h3dDQvtbO2GAuKqgq8+hudNCKcXRrUbCweMGAHg5ON+Ck3ORxr1K5tzZNBPP/v8B7Fnvpv711+SUYsytONsLddUeaisMbEdo7UphFVQUadqPL/SB7AzFOr/Cl6GwbKHhvkn3YAozsDJLsa3ETbUIgBCy4XGvzcVOK+w+T1RqRf3UN62UH9w05+eoCCfThqFxFyIW5SyHNdmK0SlhbPqvrqNhGZgMuU0oUY3PwPhMbOss+lfxEoBWkLwjHaccEcsjoppATqT79xzE0UjbLxus5SdjUXMcAAAAAElFTkSuQmCC',
    'target': 'SEARCH',
    'home': 'http://btbtdy1.com',
    'author': 'lanyuanxiaoyao',
    'description': 'BT电影天堂-迅雷BT种子下载|高清电影下载',
    'parser': 'CSS',
    'downloader': 'HTTP',
    'charset': 'UTF-8',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    },
    'tags': {},
    'rules': {
      'http:\\/\\/btbtdy1\\.com\\/search\\/.+\\.html\\?page=\\d+.*': {
        'list': {
          'expression': '.list_so > dl',
          'title': {
            'expression': 'dd.lf strong a',
            'attribute': 'title'
          },
          'description': {
            'expression': 'dd.lf > p:nth-child(4)'
          },
          'author': {
            'expression': 'dd.lf > p:nth-child(3)'
          },
          'dateTime': {
            'expression': 'dd.lf > p:nth-child(2)',
            'script': 'var result = text.match(/.*：(.+) \\/.*：(.+) \\/.*：(.+)/)\nif (result) {\n    return result[1]\n}\nreturn \'\''
          },
          'link': {
            'expression': '.lf strong a',
            'attribute': 'href',
            'replace': [
              {
                'regex': '^',
                'text': 'http://btbtdy1.com'
              }
            ],
            'script': 'var regex = /.*dy(\\d+)\\.html$/\nvar result = text.match(regex)\nif (result) {\n    return \'http://btbtdy1.com/vidlist/\' + result[1] + \'.html\'\n}\nreturn \'\''
          },
          'extra': {
            'location': {
              'expression': 'dd.lf > p:nth-child(2)',
              'script': 'var result = text.match(/.*：(.+) \\/.*：(.+) \\/.*：(.+)/)\nif (result) {\n    return result[2]\n}\nreturn \'\''
            },
            'score': {
              'expression': 'dd.lf > p:nth-child(2)',
              'script': 'var result = text.match(/.*：(.+) \\/.*：(.+) \\/.*：(.+)/)\nif (result) {\n    return result[3]\n}\nreturn \'\''
            }
          }
        },
        'next': {
          'expression': '.pages a:contains(下一页)',
          'attribute': 'href',
          'script': 'var result = text.match(/(\\?page=\\d+)/)\nif (result) {\n    return params.url.replace(/\\?page.*/, \'\') + result[1]\n}\nreturn \'\'\n'
        }
      },
      'http:\\/\\/btbtdy1\\.com\\/vidlist\\/\\d+\\.html': {
        'text': {
          'expression': '.p_list_02',
          'supplement': {
            'replace': [],
            'script': 'var regex = /.*\\/(\\d+)\\.html$/\nvar result = params.url.match(regex)\nif (result) {\n    return \'http://btbtdy1.com/btdy/dy\' + result[1] + \'.html\'\n}\nreturn \'\''
          }
        },
        'list': {
          'expression': '.p_list_02 li',
          'title': {
            'expression': 'a.ico_1',
            'attribute': 'title'
          },
          'content': {
            'expression': 'span > a.d1',
            'attribute': 'href'
          }
        }
      },
      'http:\\/\\/btbtdy1\\.com\\/btdy\\/dy\\d+\\.html': {
        'text': {
          'expression': '.vod > .vod_intro',
          'title': {
            'expression': 'h1'
          },
          'description': {
            'expression': 'div.des'
          },
          'author': {
            'expression': 'dl > dd.zhuyan',
            'replace': [
              {
                'regex': '&nbsp;',
                'text': ' '
              }
            ]
          },
          'dateTime': {
            'expression': 'dl > dt:contains(更新) + dd'
          }
        }
      }
    },
    'search': 'http://btbtdy1.com/search/{query}.html?page=1'
  },
  {
    'code': '43e259b9-abd3-465f-bd22-7bdc8ad907a2',
    'name': 'Nyaa',
    'category': 'ACG',
    'icon': 'data:image/png;base64,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',
    'target': 'SEARCH',
    'home': 'https://nyaa.si',
    'author': 'lanyuanxiaoyao',
    'description': 'A BitTorrent community focused on Eastern Asian media including anime, manga, music, and more',
    'parser': 'CSS',
    'downloader': 'HTTP',
    'charset': 'UTF-8',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    },
    'tags': {},
    'rules': {
      'https:\\/\\/nyaa\\.si\\/\\?q=.+&p=\\d+': {
        'list': {
          'expression': '.container table.torrent-list tbody > tr',
          'title': {
            'expression': 'td[colspan] > a[title]:not(.comments)',
            'attribute': 'title'
          },
          'dateTime': {
            'expression': 'td:nth-child(5)'
          },
          'link': {
            'expression': 'td[colspan] > a[title]:not(.comments)',
            'attribute': 'href',
            'replace': [
              {
                'regex': '^',
                'text': 'https://nyaa.si'
              }
            ]
          },
          'extra': {
            'size': {
              'expression': 'td:nth-child(4)'
            },
            'view': {
              'expression': 'td:nth-child(8)'
            }
          }
        },
        'next': {
          'expression': 'ul.pagination > li.next > a',
          'attribute': 'href',
          'replace': [
            {
              'regex': '^',
              'text': 'https://nyaa.si'
            }
          ]
        }
      },
      'https:\\/\\/nyaa\\.si\\/view\\/\\d+': {
        'text': {
          'expression': '.container > .panel:contains(Magnet)',
          'title': {
            'expression': 'h3.panel-title'
          },
          'author': {
            'expression': 'a[title=User]'
          },
          'dateTime': {
            'expression': 'div[data-timestamp]'
          },
          'extra': {
            'size': {
              'expression': 'div.col-md-1:contains(File size) + div'
            }
          }
        },
        'list': {
          'expression': '.container > .panel:contains(Magnet)',
          'title': {
            'expression': 'h3.panel-title'
          },
          'content': {
            'expression': '.panel-footer a:contains(Magnet)',
            'attribute': 'href'
          }
        }
      }
    },
    'search': 'https://nyaa.si/?q={query}&p=1'
  },
  {
    'code': '98b54ae1-5ac4-43a9-b1e5-83cb64932952',
    'name': '雨花阁',
    'category': '综合',
    'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD4klEQVRYhcWXb0wbZRzHP89dj2sLhbXlT+iYbIkzxiWAMShuTEmQZKibzhfb1Mws2WKIiTMmBpdoiPPFNIu+0BjfjLFkmmxq3EwQ62YIzcgWFjRj6jYU2TCwdQp0G9CWa3s9X4BA01IOpO6bXHL3e373+36e33OX504AjO6pL9F04yAGNQYUk0EJ8CPwqbJodDd7h8TonvqSSd24iIErk8YpSAJWWZRL0zP/f80BDFyabhyUMKhZtqJCmjrMQ9RI6dbctuEJPEe8eI54sT9en7aWWvEInpY2PC1t5Dy5zaQ/xWlxbVWzzYn096YtZntow8y5HvjbFACAuL5rk5FqQC2rxP36uwsWGPvyMOHuTgrfO4SwKGlz4xNj3Hx1e0LMkipRWb0WZ8ObwNTMw91ncDy7E8lqI3L1N0I+LygKQkhoV3pw7W1CWBSig9cInf0BS0Ex2bWbAQi2txIb9gMQG/ozySsJIOeZF3E8vR1hUdAuXSDw8X6MiIZSsgZ7dR2W4lWEujogGkEuKCb/rQ+R85xEB68y+sHbxMdugUXBVl2HpFoxYlGCp07O25WkZ8Cx5XmMaJSJUycIfHoAIx4HIPzTWWIjf6HfGkFy5AIgu/KR85yEzrUzcuCNKXOAWJTI778S1yaR3UXzmkOKZyBn8w6C7d+Sdd863K+9gxHXCXy0H+3nbnK37UZ2FczebLMj5xcRG7yW1gQg0neJYHtrUjxpCSZajwOg9ZwndK4d+/panA37GG56BaX0XtQHKpKKKJ57FgQw4jqYAZir8W8+x76+Fslmx7F1J2NftZC1dt2CZjOSBHk7Xk6bkhLAUrIaOc8FAoIdbcjuQvTRYaIDfUQH+swDiCUCOLa8gK1yI0Y8jn/3UwBYKzdS+P5hU77h8z7GT35mKjftEsyVZLVjKfKYy81dYbaseYC5uvNFM8Hvv06IWR98FNfepqkLIUzXWsTWtRiZB1hSB+zVdUlvg7xizieFef+lASgrS1FWls47LjLdgdtHPyHk+y4hZnv4MZwN+6YJMgyAEQcjcRcXtuyZ89jN65kFsFZUITvn7AmqOvPxoo/dJtzVsfwABgbG9KzVskrUssrE8eA44e5Oxk8cRQ8MLz9AuPM04c7TpgsDSNmO2Qtd/28AZmVZtQZrRRVIEur9ZTPxSP+VxQMYWnjRALIzn9znXkqITf7yI6F5upcSYPJCF5H+XrTLPYsG0C73cOf4IURWFsRiRAb+INJ7Memt+Vfixq5NNzL9PzifBPglBL67YT5N4JNUWTQiCNwF84Aqi0bJ3ewdssqiXAiOCfBn3he/EByzyqLc3ewd+gdztEoUb6/DqQAAAABJRU5ErkJggg==',
    'target': 'SEARCH',
    'home': 'https://www.yhg222.xyz',
    'author': 'lanyuanxiaoyao',
    'description': '简单好用的BT搜索引擎',
    'parser': 'CSS',
    'downloader': 'HTTP',
    'charset': 'UTF-8',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    },
    'tags': {},
    'rules': {
      'https:\\/\\/www\\.yhg222\\.xyz\\/search\\/.+-\\d+\\.html': {
        'list': {
          'expression': '#wall div.search-item',
          'title': {
            'expression': '.item-title h3'
          },
          'dateTime': {
            'expression': '.item-bar > span:contains(创建时间) b'
          },
          'link': {
            'expression': '.item-title h3 > a',
            'attribute': 'href',
            'replace': [
              {
                'regex': '^',
                'text': 'https://www.yhg222.xyz'
              }
            ]
          },
          'extra': {
            'size': {
              'expression': '.item-bar > span:contains(文件大小) b'
            },
            'view': {
              'expression': '.item-bar > span:contains(下载热度) b'
            },
            'number': {
              'expression': '.item-bar > span:contains(文件数量) b'
            }
          }
        },
        'next': {
          'expression': '.bottom-pager > a:contains(>)',
          'attribute': 'href',
          'replace': [
            {
              'regex': '^',
              'text': 'https://www.yhg222.xyz'
            }
          ]
        }
      },
      'https:\\/\\/www\\.yhg222\\.xyz\\/hash\\/\\d+\\.html': {
        'text': {
          'expression': '#content',
          'title': {
            'expression': '#wall > h2'
          },
          'dateTime': {
            'expression': '.fileDetail .detail-table > tbody > tr:nth-child(2) > td:nth-child(2)'
          },
          'extra': {
            'size': {
              'expression': '.fileDetail .detail-table > tbody > tr:nth-child(2) > td:nth-child(4)'
            }
          }
        },
        'list': {
          'expression': '#wall .fileDetail .detail-panel:has(a.download)',
          'title': {
            'expression': '.panel-header'
          },
          'content': {
            'expression': 'a.download',
            'attribute': 'href'
          }
        }
      }
    },
    'search': 'https://www.yhg222.xyz/search/{query}-1.html'
  },
  {
    'code': '2a534ba1-c675-4cd9-80e6-b6e58598ddc4',
    'name': 'Torrent Kitty',
    'category': '综合',
    'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4jcWRT06DUBjEfx/gBYyuXLJwaywSoBtj0oQLcABvwiF6ExNjTExMXABNmuiijUs3rMoFmgLPRbH/BClsnN2b92befPPBf0PqyIHnmZKXYwU+AIrXQuf+PY6/fhmEYWg8PD6tqnMGnLV8mgIXANNJLAIwsB3VJ/7GoI/JdBILgLYlfL2reM8AwlLHuOoihoYtXNvenVC+7FDLXBfzI4rSY1MC617autGaLoIg2HTiuu5p07vaESxreKm04nOHWhhycpskb/OjEhyIAc5ztZpBNdaN8/ynQQsUwuinmyaDZa1wDQGyw3X2xjcW6UtD3Axv8wAAAABJRU5ErkJggg==',
    'target': 'SEARCH',
    'home': 'https://www.torrentkitty.vip',
    'author': 'lanyuanxiaoyao',
    'description': 'Torrent Kitty - Free Torrent To Magnet Link Conversion Service',
    'parser': 'CSS',
    'downloader': 'HTTP',
    'charset': 'UTF-8',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    },
    'tags': {},
    'rules': {
      'https:\\/\\/www\\.torrentkitty\\.vip\\/search\\/.+\\/\\d+': {
        'list': {
          'expression': '#archiveResult tr:has(.action > a)',
          'title': {
            'expression': 'td.name'
          },
          'dateTime': {
            'expression': 'td.date'
          },
          'link': {
            'expression': 'td.action > a:contains(Detail)',
            'attribute': 'href',
            'replace': [
              {
                'regex': '^',
                'text': 'https://www.torrentkitty.vip'
              }
            ]
          },
          'extra': {
            'size': {
              'expression': 'td.size'
            }
          }
        },
        'next': {
          'expression': '.pagination > a:contains(»)',
          'attribute': 'href',
          'script': 'var next = params.url.replace(/\\d+$/, text)\nreturn next ? next : \'\''
        }
      },
      'https:\\/\\/www\\.torrentkitty\\.vip\\/information\\/.+': {
        'text': {
          'expression': 'div.wrapper:has(.detailSummary)',
          'title': {
            'expression': 'h2'
          },
          'dateTime': {
            'expression': 'table.detailSummary tr:nth-child(5) > td'
          },
          'extra': {
            'size': {
              'expression': 'table.detailSummary tr:nth-child(4) > td'
            },
            'number': {
              'expression': 'table.detailSummary tr:nth-child(3) > td'
            },
            'hash': {
              'expression': 'table.detailSummary tr:nth-child(2) > td'
            }
          }
        },
        'list': {
          'expression': 'div.center:has(textarea.magnet-link)',
          'content': {
            'expression': 'textarea.magnet-link'
          }
        }
      }
    },
    'search': 'https://www.torrentkitty.vip/search/{query}/1'
  },
  {
    'code': '179363b0-2305-4732-8c7d-8ae5777fb151',
    'name': '超人搜索',
    'category': '综合',
    'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD40lEQVRYhcXXz28VVRQH8M+dvqK2gosKtqWBYoIGgwQFC8YfqyJqIkZIlI0bF2zdIP8DuHLDwoVb3OhCjFKiKZEVSiExJPyI8gr0TSlaEoRWSvtmXMx90JT3+vhR4jeZxeSec75nztx7zvcG94DjG7Q+M6Q3sC1hE1bFZ3E0uY4yyhnHcr4b22B445DpZrFDM+KeIS/n7MKbOb0oNYk5ExjGL4EvRzY4MV8iDRO4SHcrn+Z8gqdnLd0IXMgYD+SQExI6clbiyVm2fwe+muaLFaT3nMBlNlXZF3gj2mT4PedQCz9NcmoV/8z2KbOkjbVV+gNvYx0S5DlHW9jTybFGH3wbY/SnnE3J41OusPsSy5s6R1xieYXdKeVZcc6O0T+v4yh9KaejQ5YycIX1eZO9Ug854QrrUwZirDzl9Ch9dR0u0p1yJBpWKxy4SPf9EteLW+FASjXGPnJX3EFKo+ydVa5Dw3Q9LHkNw3SlHKrFH2XvYDxNgWLTZRzEUpRL7FjGSRin5wZPLWJihulWFt2iHVdXkOaEMXpbeWKKiSozi3hsiraE0R7G4QovzfCNon/8lfBeJ8dKg5TiOV+q2LH7a+QwzfOL2JLxSgsrM/4s8VvOj4qjFaqsq/Ja4NUWuqqcamXoFt+KCSzjZIX9gX1YmrNrkCGXWJ1yLiWvcGKcnnplTPkgZSLl40alrrAnZWqUd+qtj9NT4UT8FecusToJbItlgYEORuo5B65iOsQvqoekaMk5Juutx9gD8XVVYFsSimNRwkSJnxsFXyhEjgmUAn1J4FkIDE9y6lEnMMmpOCsEnk3E8meM93KtkePMAzSjeujlWnbnN64qiSO1NlgaoVSckBbsqPCCos/fRk4153VN4szhWtxstN6FnKmk+IfJnKUs49b9lqmk2Lkdzfr9DKGFauD7Ln6oZzNaJPh+M9KcEMmuJwolI6GjzJJ5Mm1a2ntBmSUJHbXXJOd8zKq3jbULQTIf2lgblZWc80koRMIM2qvN5vUCIHK0K6TbsaRaDKFyXN/aqBUrNl3IipPwQIixt8bXcpWDyR+UA0chsP4mO2c7jfDcGP05H2JxwvaUt1LW1GxS1lxgS15IuFa8O0b/5TstHtxkZ2B95DoauecfxynbsRGTCTMZbaF4jnfydfT/KONF/KvQj+2Bx3MOd3OYxuMYdQXJwEKooRqi2hqoJ0jmGtUkWVbhQJnOhyUv0xklWdZQktUwwuZZiri6gKK0pgfPjrB5Xscoy888All+pp4sr/tlo/RlfL6QF5OEz7r49Z4SYN6r2URguMHVrFfRZGp4sKtZDf/r5XRuIo/qev4fSwTScdcGKp0AAAAASUVORK5CYII=',
    'target': 'SEARCH',
    'home': 'https://crso.pw',
    'author': 'lanyuanxiaoyao',
    'description': '超人搜索（www.crsoso.com）最好用的磁力链接搜索。',
    'parser': 'CSS',
    'downloader': 'HTTP',
    'charset': 'UTF-8',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    },
    'tags': {},
    'rules': {
      'https:\\/\\/crso\\.pw\\/search\\/.+\\/page-\\d+\\.html': {
        'list': {
          'expression': '.container .list-view > article.item',
          'title': {
            'expression': 'a > h4',
            'replace': [
              {
                'regex': '&nbsp;',
                'text': ' '
              }
            ]
          },
          'dateTime': {
            'expression': 'a:has(h4) + p',
            'replace': [
              {
                'regex': '&nbsp;',
                'text': ''
              }
            ],
            'script': 'var regex = /热度：(.*?)\\s*文件大小：(.*?)\\s*创建时间：(.*?)\\s*文件数量：(.*?)\\s*$/\nvar result = text.match(regex)\nif (result) {\n    return result[3]\n}\nreturn \'\''
          },
          'link': {
            'expression': 'a:has(h4)',
            'attribute': 'href',
            'replace': [
              {
                'regex': '^',
                'text': 'https://crso.pw'
              }
            ]
          },
          'extra': {
            'size': {
              'expression': 'a:has(h4) + p',
              'replace': [
                {
                  'regex': '&nbsp;',
                  'text': ''
                }
              ],
              'script': 'var regex = /热度：(.*?)\\s*文件大小：(.*?)\\s*创建时间：(.*?)\\s*文件数量：(.*?)\\s*$/\nvar result = text.match(regex)\nif (result) {\n    return result[2]\n}\nreturn \'\''
            },
            'number': {
              'expression': 'a:has(h4) + p',
              'replace': [
                {
                  'regex': '&nbsp;',
                  'text': ''
                }
              ],
              'script': 'var regex = /热度：(.*?)\\s*文件大小：(.*?)\\s*创建时间：(.*?)\\s*文件数量：(.*?)\\s*$/\nvar result = text.match(regex)\nif (result) {\n    return result[4]\n}\nreturn \'\''
            },
            'view': {
              'expression': 'a:has(h4) + p',
              'replace': [
                {
                  'regex': '&nbsp;',
                  'text': ''
                }
              ],
              'script': 'var regex = /热度：(.*?)\\s*文件大小：(.*?)\\s*创建时间：(.*?)\\s*文件数量：(.*?)\\s*$/\nvar result = text.match(regex)\nif (result) {\n    return result[1]\n}\nreturn \'\''
            }
          }
        },
        'next': {
          'expression': '.pagination > li.next > a',
          'attribute': 'href',
          'replace': [
            {
              'regex': '^',
              'text': 'https://crso.pw'
            }
          ]
        }
      },
      'https:\\/\\/crso\\.pw\\/hash\\/.+\\.html': {
        'text': {
          'expression': 'section.hash-view-title',
          'title': {
            'expression': 'h2'
          }
        },
        'list': {
          'expression': 'section.hash-view-download .panel-body .list-unstyled li',
          'title': {
            'expression': '.media-body h4.media-heading'
          },
          'content': {
            'expression': '.media-body h4.media-heading + a',
            'attribute': 'href'
          }
        }
      }
    },
    'search': 'https://crso.pw/search/{query}/page-1.html'
  },
  {
    'code': '8e130dbc-7f2e-45cb-a927-76574f666155',
    'name': '大圣盘',
    'category': '网盘',
    'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAlCAYAAADMdYB5AAAFTElEQVRYhZ3YX4hU9xUH8M+df+7M+qcPqymBpGwtKZSCrGClUBRqAinUPpdAqbY1o9EHBbcvhTgNSB8stA9rdHStFivdp9IQKX1oH8xLqxJDQn1w20WaYMlaoUn8M+vemfn1YWaud3Zm3Jl8YRju+Z17zvece865v/uLfA6EWVOyjip4UcYmTXc98EdZp6OfeG9Ue9FIzisKJh1XcHSg0md+HpVVRrGbGUV5VQINjDsWzjk8itmhMxFmTRl3Y6DzDrKoW7Lka9E+t4exPXwmsn0y0FhBoCOLjCl4bVjTw2fikkUZm7qc9UNHnnHVI+/DagU7VCZCRUHTbXVLfaPvR6xhQsFaY16VcSP81olQURiJRKiaCFWVcMmir3osY1LdH0TuthRc7XKevoase3I2J8Qajpp0fGgSYdaUko+sd0zGpraTTfJe0bQeLJtTtyBYEixYNtdlpG5BbHuXrOFomDW1KolwwriiP8sZS6JMI2rLsw6JvWTBBrGXZB1K9BvI2dwvQA37V4pyPUrrTSfRr0Tkrqbbls2puSHvvnF5Tfc98CNFWxV8X8NETxYgxhq7VidR8nIXgWDJQ3+R87rgE5EveGyLdXZrKpto6435jwduCg4kenVviOxCMbH32LOrk2BLisBVn/qpnGn51KDKJ+tP0Ohy1cFlsZdl/VLGtrasR6tnToTftU23qn2LZrsGMpYSpaaxgW0aq6WuOg5rSj7wyHbUorJS+pauwuzq46btmsbk3BXbGv1AsfNT8z1r2q36xNKCpq1RWanzk7VV3SKKbQI0/WOlryQTYdaUujcUfTcxnHPXPz0XVSz3CzqcNWnZTgVXBr0nQkXBRh/KeaadqXmRDbL2Rfu93UUCwkV/10xVdd2R6Md+3c/4KAgn7ZFzPhE0XY8O+EbnMhcqCjZ7p53+bsQWaM+OL7rnMweigy4M6fRNPB+V3bPG+0kNxWBbmBEwr2Zrxpec74q+g1ThRdMeeiQoOh9+I4Rq/01LqKqEqtCJOiq7B5asEycE0njBOnMZBS8OJFC0I5GVfJDSOBZOudZFoHV9LBG0CxDkfbsfaTEiu6JwUS1pw5Vtl7fkkec6EYWKgvH2lHgoThfsoLVQNYEPxX2mSMtHLUqKcVDf1ywq+Oawu6Q02t3zN6HdGSsRY8z1jIeODyQARc9ourmyDsJZk+GUa2HGjnDKtXDWZNd6VVXTzb4E0vXR9GYm2u9tNXt7lLqVizgWZtxKnN1xR8kVeVdkvOeOO7TmTTjpY7FX+z6CdHGudyQ66EIGooMuiG0UHEnGbm8lk/d7n7QmZVSxHP3QNDZGZeWkPv5n3loXB0ZfdFneTiUbOzOo991xwb887rMXqFv0X88Pmp5dNk4YV7KQPIpY66UXo+RMVFZO6/dsaqI9viI232M5561+BMJpu8Mp18JJH4cZt8Jpu6NpD5X8NSGQ/udnvab7IfILUmO2E0na+TmHxXaJvKvuqDH3k7UTxlc4bj2GVmYO0V3kA7f84bxLlr2SGMs+mfft3n8yEfvdP+OW2AuJYK0vD2rzwVv+f9uLM0k0DdvCTGuCRmX3nkrgpD1dBErOPG3OrPrxE845rOZXbe1Fa3znaR8y4bTdGs5abhdlwaKcrz+N9FBfYGHWlCVztKPLuSzn9TSZMGOHnGm11H4E8nZGh7zzNPvDfwZWTWj6k0Z7rxhrRRl8KrIhiTyNgr3DvPpHO584Ydw6cz3R9sOQBEYmkRAputFVeGmMuS6vPMqJzWiHJNobHPb1LOTNK9hr0bdGPTIaORMdhKqq4FmRd2W99XnOqjr4P74eAF3dXEzzAAAAAElFTkSuQmCC',
    'target': 'SEARCH',
    'home': 'https://www.dashengpan.com',
    'author': 'lanyuanxiaoyao',
    'description': '网盘搜索，就用大圣盘 - 最好用的百度网盘搜索引擎',
    'parser': 'CSS',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    },
    'rules': {
      'https:\\/\\/www\\.dashengpan\\.com\\/search\\?keyword=.+&page=\\d+': {
        'list': {
          'expression': '.search-result .result-wrap > .resource-item-wrap',
          'title': {
            'expression': '.resource-info > .resource-title > a'
          },
          'description': {
            'expression': '.detail-wrap',
          },
          'dateTime': {
            'expression': '.other-info > .time'
          },
          'link': {
            'expression': '.resource-info > .resource-title > a',
            'attribute': 'href',
            'replace': [
              {
                'regex': '^',
                'text': 'https://www.dashengpan.com'
              }
            ]
          },
          'extra': {
            'size': {
              'expression': '.resource-meta > .meta-item > .label:contains(文件大小) + .em'
            }
          }
        },
        'next': {
          'expression': '.pager-wrap a.pager-item:contains(下一页)',
          'attribute': 'href',
          'replace': [
            {
              'regex': '^',
              'text': 'https://www.dashengpan.com'
            }
          ]
        },
        'options': [
          'OPEN_DIRECTLY'
        ]
      }
    },
    'search': 'https://www.dashengpan.com/search?keyword={query}&page=1'
  },
  {
    'code': 'afee8741-8deb-4a34-8827-7ec0cc4fd651',
    'name': '罗马盘',
    'category': '网盘',
    'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAY1BMVEUAAAAAT7IAULMAT7MAT7IAT7IAT7UAULMAT7MAT7MAVbgAUbQAT7MAT7MATrMAULMAT7MAT7MAULQAT7MAUbMATrIAT7MAT7IAT7MAULIAULQAULUAT7IAT7MAULMAT7MAULPYtpYGAAAAIHRSTlMA5COu7vYeEIYsCRhLqLY/bs5ZxTLcj9V7n2U4vmCWdRcC04sAAAR7SURBVFjDnVbpgrIwDGxrD2jLfYNi3/8pv0nZdb0WPjc/FCWZhMk0hL2zNuHh0dSptux/rTipLUp2VdMM31g80f8XnlO4alYvtDPWGKeX8cQ3CHcYrnuJ6CppDROFv/bTmtQF/agjblUfpa/gdfbGtmPOEbGZbKbC4ckIuzd78TNcutlYD98nq0bNPME3O0yMyJlr1mZqy5vMl7q+lKcu/ualMQmuhvS3+AQVJviSFN37uzuirGIVC/NU4y8II8IuTDTkWVrmLv2wZT5dF8aWnHozspSjBvEuvlZB1mzpYq3skQU1lG5jYLICHs2bdgoZ1Mw88M8t0qkYx6tzMxBSRHUTvjO7wGd9iTeoPIn5M2dLThFZ3WoIyYkiqQgvby2xvFqPXC96KOFgRIV4Yya4daO4h/c5QXo749aV2O7M0wPwIFubhXAyBr5qEi8U8QCO7BWfhTmH0D/e7kMY2Qz6tUU8fyfYtEKsZxOcXKGCcs8FGM0BTlBdy96ZA7RMbUe5UGvyJKErhfasDoTy3lyD7BbZuUgVMt5xVAXptAydcEMIvx+49JadPuafG16FiV3p5kgt/t2oPlPIMDiPrtk7CpVnFSrTHUrZAbAnynJGlQaE6dvfTeBOQALUh2R/XoBie4ErdcPf9SAnJV3QQpXuApBgC5ynjvz7OwqIFSWA1LB9G6nGBp1KqYwvQ0m1rcJgPN3dN0HkTdQqtNTcVAB1Stwo6bn2DX7cgaqSySC/9b7iHDgcdXRDLgcAdghKF/T8ww9fGRoo6L8JoEcA6CEBZCBCfUv+RNrc5MUPXz44EAIAJ1LDC8DpGMA2WwUThKf+BNCBg9gtiDb9A4BRaHdJJ0ki6g8AC/GXbTpozB8AEjpNFfoeO/E5gBnQhAXnOWr6DwA1CqfBulI7l88BTENnFg30TkHSnwMgd0fvwMrMJIWPAbwE/SSlkhTtPwZo+Ta1tpHI7acA7YBQrWUcXXSgdwCcfVO/QtaUHiA3GEGS7QGU5+e54PoAAun1CWeNWuZ9gCCn4mVzPadmDWihyUgNuwCXbcfyrRDtUoznbWtyDpF49jK+/nYBzFwFMsm5VPFK5Qsrmrgl1ZJQ9gEsc/Xdoqk4HsglEohlFMNkDwDqXjCm/XU9NV01ld4wc+XEoocOqQ3sAKBEybO7OZjLtnpOzo4h7mjHAGQ8X5PruDYyRMsLJvJAWxA7AkDKswoPJrPCmjF2I+Y/JNGKMqu4+l7Wa8102eE6bmnHAHXmcWFE2xZF2wrDdDEhHOX72yw94qDLR+hI67RtfZIPYbOShuJ6DDCrr/7zTt7IOF9l6LShXe6YxII29TuTNEq2Pe5yrIPNtC/7LK94lfdQ0kJjRHf0OmuAdQjwais5zMjO4pb2OYAD/a2Jo3B6XmT6IddiGEpcnN3eRM6sp4mccoymh2nvEOacjRe/Gq2z3mbUyhFYD9WJm+0NZZzDxqQkJFcFdd/Kid+s2kPINyFtK3nzQOLN+B7AchOSAdbl50aZ3Ww1OwBRSLGVdlGBf7n+A2koklM17t7xAAAAAElFTkSuQmCC',
    'target': 'SEARCH',
    'home': 'https://www.luomapan.com',
    'author': 'lanyuanxiaoyao',
    'description': '网盘资源搜索，就用罗马盘 - 最好用的百度网盘搜索引擎',
    'parser': 'CSS',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    },
    'tags': {},
    'rules': {
      'https:\\/\\/www\\.luomapan\\.com\\/search\\?keyword=.+&page=\\d+': {
        'list': {
          'expression': '.main .search-result .result-inner .result-wrapper .roma-item-wrapper',
          'title': {
            'expression': '.roma-info > h1.roma-title > a'
          },
          'description': {
            'expression': '.roma-info > .roma-detail-wrap'
          },
          'dateTime': {
            'expression': '.roma-info > .roma-meta > .meta-it:contains(时间)',
            'replace': [
              {
                'regex': '时间：\\s*',
                'text': ''
              }
            ]
          },
          'link': {
            'expression': '.roma-info > h1.roma-title > a',
            'attribute': 'href',
            'replace': [
              {
                'regex': '^',
                'text': 'https://www.luomapan.com'
              }
            ]
          },
          'extra': {
            'size': {
              'expression': '.roma-info > .roma-meta > .meta-it:contains(大小)',
              'replace': [
                {
                  'regex': '大小：\\s*',
                  'text': ''
                }
              ]
            }
          }
        },
        'next': {
          'expression': '.pager-wrapper > .pc-pager-wrapper > a:contains(下一页)',
          'attribute': 'href',
          'replace': [
            {
              'regex': '^',
              'text': 'https://www.luomapan.com'
            }
          ]
        }
      },
      'https:\\/\\/www\\.luomapan\\.com\\/detail\\/.+': {
        'text': {
          'expression': '#info',
          'title': {
            'expression': 'h1.filename'
          },
          'dateTime': {
            'expression': '.roma-meta > .meta-item:contains(时间)',
            'replace': [
              {
                'regex': '分享时间\\s*',
                'text': ''
              }
            ]
          },
          'extra': {
            'size': {
              'expression': '.roma-meta > .meta-item:contains(大小)',
              'replace': [
                {
                  'regex': '资源大小\\s*',
                  'text': ''
                }
              ]
            },
            'password': {
              'expression': '.roma-meta > .meta-item:contains(密码)',
              'replace': [
                {
                  'regex': '提取密码\\s*',
                  'text': ''
                }
              ]
            }
          }
        },
        'list': {
          'expression': '.detail-content',
          'title': {
            'expression': '#info h1.filename'
          },
          'content': {
            'expression': '#statement > .button-wrap > .button-inner > a',
            'attribute': 'href'
          }
        }
      }
    },
    'search': 'https://www.luomapan.com/search?keyword={query}&page=1'
  },
  {
    'code': '52e8bdc3-84bc-495c-a406-b053a94fc825',
    'name': '52网盘',
    'category': '网盘',
    'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAe1BMVEUAt2D////6/vwpwnny+/d12apd0ZskwXcEuGL2/Pmz6tBX0JYKumfb9ejT8+Oa48BLzI9Gy4wUvW3u+vXl+O/G79yr58qi5cWP37lm1KAQvGrr+fPg9uuK3raE3LM5x4MxxX8ewHMcv3HN8N+569OU4bxw16Y/yYd92q7de33rAAABJ0lEQVQ4y5VS6XqDMAwDCgFCuI9Cabl6bO//hBOMJjjQfd/0T5awkWPjH8hYVfgtb8ZjeYp98xdWdTrQg9xU8J2d7ljr16sl1nRmzSIP3GxMzoupI/rJRins36yc3enWwFGJMknFY+ae0gc0tV1D4XKFI1C8Bv2mmVDhikYIlhGDd0VPIRtiQqnFitFCrss9yP1CLZUhQWrN0KCWvMkIctY3u+0gbKTWDBUMKniJxdEHvODpCo/0i+kEOnXy1e7V23xtCk/wvJfUDcEfhr573xEL8Vhr0rcBetsEiidLghs+ByJBY6W5qaGSIeSVaLhRA0bf14MMX/Vyno2hw2Vd3TUDzHxxyKB7iPvsaE+fHVOxDMs+Owab/ugegbW7gv1JWInxFxif9R+gmwvlxb25oAAAAABJRU5ErkJggg==',
    'target': 'SEARCH',
    'home': 'https://www.56wangpan.com',
    'author': 'lanyuanxiaoyao',
    'description': '专业网盘搜索引擎-56网盘搜索为您带来最佳网盘搜索体验',
    'parser': 'CSS',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    },
    'tags': {},
    'rules': {
      'https:\\/\\/www\\.56wangpan\\.com\\/search\\/kw.+pg\\d+': {
        'list': {
          'expression': '.content .sellListContent > li',
          'title': {
            'expression': 'div.info > .title > a'
          },
          'description': {
            'expression': 'div.info > .address'
          },
          'author': {
            'expression': 'div.info > .rInfo > .sharer'
          },
          'dateTime': {
            'expression': 'div.info > .rInfo > .feed_time'
          },
          'link': {
            'expression': 'div.info > .title > a',
            'attribute': 'href',
            'replace': [
              {
                'regex': '^',
                'text': 'https://www.56wangpan.com'
              }
            ]
          }
        },
        'next': {
          'expression': '.content .contentBottom .list-page-box > a:contains(下一页)',
          'attribute': 'href',
          'replace': [
            {
              'regex': '^',
              'text': 'https://www.56wangpan.com'
            }
          ]
        },
        'options': [
          'OPEN_DIRECTLY'
        ]
      }
    },
    'search': 'https://www.56wangpan.com/search/kw{query}pg1'
  },
  {
    'code': 'bb32f4ff-06ad-4709-b0c3-fb648ea210bd',
    'name': '小白盘',
    'category': '网盘',
    'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACClBMVEUAAAAVoIUVoIUVoIUWoIYTn4MXoIYhpYsWoIYVoIUMnICi1M4ao4kfpoyJysP///8wq5IhmYIKjnQUn4Q7sJgXoIZKtqEMnYEboogWoYQNnIEUoIYMnIEWoYi04dYTn4Ujporc7+zJ6eTk8vIjpo0boogPnYE2rZY0rpVjv60so4tKqpZevatdtKJEp5Rquaw8ppKOz8QdoYhru61SuKSBxrgMm4Cj181JrJkVoYRYuqe64ttQuqQ2rpfE5+AiqpAWoIUUkHj///8Ul30LjXQNnH8Ii3MUoIMOnYISn4QUkXkHiXANim4RnoEJm34IjHgMjnf3//////sKnIIQkHjr/v+w6vf//fS46vL/++3/+uVQtqURnZwVoYYLn4VSoH5FnncGincQjXHe/P/7/f3B6uyF4uzz9ev18d3u8N398dhiz9fn5slBu8STzr8+tbWdx64crKgToKIUpJAtnIhIoIURmoMVmYELlX4mk3RlqHIEh23K9P217/vA8fme4++Z4u564+tc2eXs8OOn4OKB1+L/9eBQzt3778673stszctRycul0Mc2v8Tf4MGJxbZ6wLbK2LXS17Szz7QutLJdtrBJsa52vaulxaW3yKFBtKFXrZwSppphtpY+rZAKl4+VuI6KsI0In4x3q4lqrohppIUDjIRZoIFZoIAdnH5ennIqjHJRlHFCnG47yfEnAAAAQHRSTlMA9Pv669qM+tLCnSgmFgsE6unp3tbLwbu2onZiVko7OjIoHBLf19PRubKyqqOdnZqahYVwcG9ubGxsa05GQkEefd7CpQAAAitJREFUOMttk2VXG0EUhmclIQlFStECFerubpOb3dhGiDUNKSUBSinFrVDq7u7uzn9kZDdLCM+nPec+570z986iWZTU19kEUbZbD5aieVhmrRIkEWNREuTa/U1zywscAjbxqJad+SkNi3A+vtDaYmSyWMIFBFctMeuiHhwKeU3Du9IwGiRWDo28Tac/qjHTWNPEz8f6qyN3T0YATt35oPoMI7SxjAoOVh86Bpzk4B/D8EkH6P0FeqKhiwDXBt+9uB6B6OvxXJNqEmGl/b92QfTJpFtzhwc6IPU9dw7xMCqpog2ed8DDyWYnQetLwFN/qxGxDdXTDrFbkPymORk/L0HP/wndUKtRHRVOXIGeTJgLgTPQci7r0qdViWwiFbrg9vRsIezkhq8cCZgKV6Glzc2F7A24+ZfILiYUIZG16otE3wTiLGD4PPT+I5/M8BQhmbV6fwFSXwJuRQl8ugzRzzzMxRLsErvOgwQkn42Njr4kA0390LudxcFyZOUPJXYvAQCdnUA5/dswvJWoUear9g7QXZFt3ScZ3b+44Z9Yh1At5qjj6cf9j16NTR0/SjL4nfzNexDal3uIypRb0xRnOzW62+jg4wuXk8du0YVW7NJHRYzeDBWULYiwGxsYRvtwfyZL6ySAUFpTaGhss8ou/Z+wFBgMZRPSWTqvoW1YgXLG6kJD2czrnCMO0TT8BKViRxnKo7Em6DGMuFKxtRgVcGi73SJLWJBt6/ea5Rm3W+LNZpzidAAAAABJRU5ErkJggg==',
    'target': 'SEARCH',
    'home': 'https://www.xiaobaipan.com',
    'author': 'lanyuanxiaoyao',
    'description': '小白盘帮收录了大量的网盘资源,页面清新，实时检查失效资源.帮您省心快速找到想要的电影,电视剧,小说,文档,音乐,软件,种子等热门网盘资源',
    'parser': 'CSS',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    },
    'tags': {},
    'rules': {
      'https:\\/\\/www\\.xiaobaipan\\.com\\/list-.+-p\\d+\\.html': {
        'list': {
          'expression': '.main-container .category-list > .item-list:has(div[fid])',
          'author': {
            'expression': 'div[fid] h5.company-title > a'
          },
          'description': {
            'expression': 'div[fid] .jobs-desc'
          },
          'title': {
            'expression': 'div[fid] h4.job-title > a'
          },
          'dateTime': {
            'expression': '.info-row > .date',
            'replace': [
              {
                'regex': '分享时间:\\s*',
                'text': ''
              }
            ]
          },
          'link': {
            'expression': 'div[fid] h4.job-title > a',
            'attribute': 'href',
            'replace': [
              {
                'regex': '^',
                'text': 'https://www.xiaobaipan.com'
              }
            ]
          },
          'extra': {
            'view': {
              'expression': '.info-row > .item-location:contains(查看)'
            },
            'size': {
              'expression': '.info-row > .salary'
            }
          }
        },
        'next': {
          'expression': '.pagination-bar > .pagination > li > a:contains(>>)',
          'attribute': 'href',
          'replace': [
            {
              'regex': '^',
              'text': 'https://www.xiaobaipan.com'
            }
          ]
        },
        'options': [
          'OPEN_DIRECTLY'
        ]
      }
    },
    'search': 'https://www.xiaobaipan.com/list-{query}-p4.html'
  },
  {
    'code': '0d3e0c9f-a9c9-40c5-999a-e67519aabac4',
    'name': '小可搜搜',
    'category': '网盘',
    'icon': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAilBMVEX///8AAAAFBQUSEhIMDAz29vbs7Oz6+vqbm5stLS06Ojrx8fHf3992dnZAQEAaGhra2tqSkpJ+fn5hYWFJSUk0NDQiIiJTU1Pj4+PHx8etra3W1tbR0dG4uLimpqbDw8OxsbGioqJaWlqHh4dsbGwnJyfLy8uDg4NwcHDn5+e8vLyNjY1NTU1nZ2e/NUqvAAACfklEQVRIx+1Ux5ajMBCkWkLkHA3G4Dwz9v7/761Akj3sTrjt28PUhaap6qBuYf3g/4QjNm706yBRnI5Tan/HF25TJYQFxM5xtHG+YNtjYcgGxCv39TP+WDB8APL3H2YJropOdVzkbtftsqipdISm/5ufNnMxzM+H0HaCcbcftrYltruTN/vr3Z/83pd+3gzCsZxLUTMizrxrKvsKs1nCXGcd3wfoPsymuHIYJJk9F3urAb5SBI305GLhH2jphNQjCmbnReZP3t4JXA5+W2Zkv5CknZuXU7G0TO5CaO9A/DzetgId1Ux3HPD2Ye+2MtnkA+deUXxQ9kwA3IUadAwqexHVfL+0VoJyxRkS+KERxGCTsiaGqrcLAlPnuD3DF+pTAZ6ZzSLE2huB76yOo+q040ZcNzsyeKnJwCKltUt4rX0Hu5jkmwSuskSVlEYgtq0+Xh9NYEdlbhtB6EE34aSheIxCGkZQrG/AtkZkwj6/7ArXMSU1YiUYmMkgmmIKHk032jyhDleCK5ke0gTctHZGvVXWnvRony2wjTKPhNIEi0C5o8J48LTWLEocKGn1bg4XhlrHyYH4oRARmWVypBm3j0OSgfxU7Uy87JIz04eSgFIsDJeD3i1474F0gRsP4NXpeItKBujMdsa01KCTjmqjFD6eqAdVGgeSzer3lUkXOy6lhAf++F+M8zQHnwDWWSvYOUlClaWzvY/narh3bCX9Ter1DV0rXJpjJkUXypd+l+23gRWMR3/WmvhrjJ6++X6Ru9Nbl72UZ1Klxan1EdprDQ0iTmRsLwusT9DnNWEN7mWh9QXa7uAlZMhJ9Wt6tb7B63TyGM1I4nwU1g/+BX4Dr4ckcW4axqUAAAAASUVORK5CYII=',
    'target': 'SEARCH',
    'home': 'https://www.xiaokesoso.com',
    'author': 'lanyuanxiaoyao',
    'description': '小可搜搜，有你更方便',
    'parser': 'CSS',
    'headers': {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    },
    'tags': {},
    'rules': {
      'https:\\/\\/www\\.xiaokesoso\\.com\\/s\\/search\\?q=.+&currentPage=\\d+': {
        'list': {
          'expression': '.container .result-box .row .document-piece:not(:contains(争议))',
          'title': {
            'expression': '.media-body > h4.media-heading > a'
          },
          'description': {
            'expression': '.media-bottom .file-list-contain'
          },
          'author': {
            'expression': '.media-bottom span:nth-child(2) button',
            'replace': [
              {
                'regex': '\\s',
                'text': ''
              }
            ],
            'script': 'var regex = /(.+)分享\\s*(.+)/\nvar result = text.match(regex)\nif (result) {\n    return result[1]\n}\nreturn \'\''
          },
          'dateTime': {
            'expression': '.media-bottom span:nth-child(1) button',
            'replace': [
              {
                'regex': '&nbsp;',
                'text': ' '
              }
            ],
            'script': 'var regex = /(\\d{4}-\\d{2}-\\d{2})\\s(.+)/\nvar result = text.match(regex)\nif (result) {\n    return result[1]\n}\nreturn \'\''
          },
          'link': {
            'expression': '.media-body > h4.media-heading > a',
            'attribute': 'href',
            'replace': [
              {
                'regex': '\\s*',
                'text': ''
              },
              {
                'regex': '^',
                'text': 'https://www.xiaokesoso.com'
              }
            ]
          },
          'extra': {
            'size': {
              'expression': '.media-bottom span:nth-child(1) button',
              'replace': [
                {
                  'regex': '&nbsp;',
                  'text': ' '
                }
              ],
              'script': 'var regex = /(\\d{4}-\\d{2}-\\d{2})\\s(.+)/\nvar result = text.match(regex)\nif (result) {\n    return result[2]\n}\nreturn \'\''
            },
            'number': {
              'expression': '.media-bottom span:nth-child(2) button',
              'replace': [
                {
                  'regex': '&nbsp;',
                  'text': ' '
                }
              ],
              'script': 'var regex = /(.+)分享\\s*(.+)/\nvar result = text.match(regex)\nif (result) {\n    return result[2]\n}\nreturn \'\''
            }
          }
        },
        'next': {
          'script': 'var regex = /(.+currentPage=)(\\d+)/\nvar result = params.url.match(regex)\nif (result && result.length > 2) {\n    return result[1] + (parseInt(result[2]) + 1)\n}\nreturn \'\''
        }
      },
      'https:\\/\\/www\\.xiaokesoso\\.com\\/info\\/.+': {
        'text': {
          'expression': '.container .row .detail-box:has(h3)',
          'title': {
            'expression': 'h3'
          },
          'dateTime': {
            'expression': 'span:contains(时间)',
            'replace': [
              {
                'regex': '时间：',
                'text': ''
              }
            ]
          },
          'extra': {
            'size': {
              'expression': 'span:contains(大小)',
              'replace': [
                {
                  'regex': '大小：',
                  'text': ''
                }
              ]
            },
            'number': {
              'expression': 'span:contains(文件个数)',
              'replace': [
                {
                  'regex': '文件个数：',
                  'text': ''
                }
              ]
            },
            'password': {
              'expression': 'span:contains(密码)',
              'replace': [
                {
                  'regex': '密码：',
                  'text': ''
                }
              ]
            }
          }
        },
        'list': {
          'expression': '.container .row .detail-box:has(h3)',
          'title': {
            'expression': 'h3'
          },
          'content': {
            'expression': '.download-erea button',
            'attribute': 'data-downloadurl',
            'replace': [
              {
                'regex': '^',
                'text': 'http://norefer.mimixiaoke.com/api/jump?target='
              }
            ]
          }
        }
      }
    },
    'search': 'https://www.xiaokesoso.com/s/search?q={query}&currentPage=1'
  }
]

module.exports = sites
