<?php

/**
 * PHP version 7.4
 * tests/Controller/Person/PersonRelationsControllerTest.php
 *
 * @license  https://opensource.org/licenses/MIT MIT License
 * @link     http://www.etsisi.upm.es/ ETS de Ingeniería de Sistemas Informáticos
 */

namespace TDW\Test\ACiencia\Controller\Person;

use Doctrine\ORM\EntityManagerInterface;
use TDW\ACiencia\Entity\Entity;
use TDW\ACiencia\Entity\Person;
use TDW\ACiencia\Entity\Product;
use TDW\ACiencia\Utility\Utils;
use TDW\Test\ACiencia\Controller\BaseTestCase;

/**
 * Class PersonRelationsControllerTest
 */
final class PersonRelationsControllerTest extends BaseTestCase
{
    /** @var string Path para la gestión de personas */
    protected const RUTA_API = '/api/v1/persons';

    /** @var array Admin data */
    protected static array $writer;

    /** @var array reader user data */
    protected static array $reader;

    protected static EntityManagerInterface $entityManager;

    private static Person $person;
    private static Entity $entity;
    private static Product $product;

    /**
     * Se ejecuta una vez al inicio de las pruebas de la clase UserControllerTest
     */
    public static function setUpBeforeClass(): void
    {
        parent::setUpBeforeClass();

        // load user admin fixtures
        parent::$writer['id'] = Utils::loadUserData(
            parent::$writer['username'],
            parent::$writer['email'],
            parent::$writer['password'],
            true
        );

        // load user reader fixtures
        self::$reader = [
            'username' => self::$faker->userName,
            'email'    => self::$faker->email,
            'password' => self::$faker->password,
        ];
        self::$reader['id'] = Utils::loadUserData(
            self::$reader['username'],
            self::$reader['email'],
            self::$reader['password'],
            false
        );

        // create and insert fixtures
        self::$person = new Person(self::$faker->word);
        self::$entity  = new Entity(self::$faker->company);
        self::$product  = new Product(self::$faker->name);

        self::$entityManager = Utils::getEntityManager();
        self::$entityManager->persist(self::$person);
        self::$entityManager->persist(self::$entity);
        self::$entityManager->persist(self::$product);
        self::$entityManager->flush();
    }

    public static function tearDownAfterClass(): void
    {
        parent::tearDownAfterClass();
    }

    // *******************
    // Person -> Entities
    // *******************
    /**
     * PUT /persons/{personId}/entities/add/{stuffId}
     */
    public function testAddEntity()
    {
        $response = $this->runApp(
            'PUT',
            self::RUTA_API . '/' . self::$person->getId()
                . '/entities/add/' . self::$entity->getId(),
            null,
            $this->getTokenHeaders(parent::$writer['username'], parent::$writer['password'])
        );

        self::assertSame(209, $response->getStatusCode());
        self::assertJson((string) $response->getBody());
    }

    /**
     * GET /persons/{personId}/entities 200 Ok
     *
     * @depends testAddEntity
     */
    public function testGetEntities200OkWithElements(): void
    {
        $response = $this->runApp(
            'GET',
            self::RUTA_API . '/' . self::$person->getId() . '/entities',
            null,
            $this->getTokenHeaders(self::$reader['username'], self::$reader['password'])
        );

        self::assertSame(200, $response->getStatusCode());
        self::assertJson((string) $response->getBody());
        $responseEntities = json_decode((string) $response->getBody(), true);
        self::assertArrayHasKey('entities', $responseEntities);
        self::assertSame(
            self::$entity->getName(),
            $responseEntities['entities'][0]['entity']['name']
        );
    }

    /**
     * PUT /persons/{personId}/entities/rem/{stuffId}
     *
     * @depends testGetEntities200OkWithElements
     */
    public function testRemoveEntity()
    {
        $response = $this->runApp(
            'PUT',
            self::RUTA_API . '/' . self::$person->getId()
            . '/entities/rem/' . self::$entity->getId(),
            null,
            $this->getTokenHeaders(parent::$writer['username'], parent::$writer['password'])
        );

        self::assertSame(209, $response->getStatusCode());
        self::assertJson((string) $response->getBody());
        $responsePerson = json_decode((string) $response->getBody(), true);
        self::assertArrayHasKey('entities', $responsePerson['person']);
        self::assertEmpty($responsePerson['person']['entities']);
    }

    /**
     * GET /persons/{personId}/entities 200 Ok - Empty
     *
     * @depends testRemoveEntity
     */
    public function testGetEntities200OkEmpty(): void
    {
        $response = $this->runApp(
            'GET',
            self::RUTA_API . '/' . self::$person->getId() . '/entities',
            null,
            $this->getTokenHeaders(self::$reader['username'], self::$reader['password'])
        );

        self::assertSame(200, $response->getStatusCode());
        self::assertJson((string) $response->getBody());
        $responseEntities = json_decode((string) $response->getBody(), true);
        self::assertArrayHasKey('entities', $responseEntities);
        self::assertEmpty($responseEntities['entities']);
    }

    // ******************
    // Person -> Products
    // ******************
    /**
     * PUT /persons/{personId}/products/add/{stuffId}
     */
    public function testAddProduct()
    {
        $response = $this->runApp(
            'PUT',
            self::RUTA_API . '/' . self::$person->getId()
            . '/products/add/' . self::$product->getId(),
            null,
            $this->getTokenHeaders(parent::$writer['username'], parent::$writer['password'])
        );

        self::assertSame(209, $response->getStatusCode());
        self::assertJson((string) $response->getBody());
    }

    /**
     * GET /persons/{personId}/products 200 Ok
     *
     * @depends testAddProduct
     */
    public function testGetProducts200OkWithElements(): void
    {
        $response = $this->runApp(
            'GET',
            self::RUTA_API . '/' . self::$person->getId() . '/products',
            null,
            $this->getTokenHeaders(self::$reader['username'], self::$reader['password'])
        );

        self::assertSame(200, $response->getStatusCode());
        self::assertJson((string) $response->getBody());
        $responseProducts = json_decode((string) $response->getBody(), true);
        self::assertArrayHasKey('products', $responseProducts);
        self::assertSame(
            self::$product->getName(),
            $responseProducts['products'][0]['product']['name']
        );
    }

    /**
     * PUT /persons/{personId}/products/rem/{stuffId}
     *
     * @depends testGetProducts200OkWithElements
     */
    public function testRemoveProduct()
    {
        $response = $this->runApp(
            'PUT',
            self::RUTA_API . '/' . self::$person->getId()
            . '/products/rem/' . self::$product->getId(),
            null,
            $this->getTokenHeaders(parent::$writer['username'], parent::$writer['password'])
        );

        self::assertSame(209, $response->getStatusCode());
        self::assertJson((string) $response->getBody());
        $responsePerson = json_decode((string) $response->getBody(), true);
        self::assertArrayHasKey('products', $responsePerson['person']);
        self::assertEmpty($responsePerson['person']['products']);
    }

    /**
     * GET /persons/{personId}/products 200 Ok - Empty
     *
     * @depends testRemoveProduct
     */
    public function testGetProducts200OkEmpty(): void
    {
        $response = $this->runApp(
            'GET',
            self::RUTA_API . '/' . self::$person->getId() . '/products',
            null,
            $this->getTokenHeaders(self::$reader['username'], self::$reader['password'])
        );

        self::assertSame(200, $response->getStatusCode());
        self::assertJson((string) $response->getBody());
        $responseProducts = json_decode((string) $response->getBody(), true);
        self::assertArrayHasKey('products', $responseProducts);
        self::assertEmpty($responseProducts['products']);
    }

    /**
     * @param string $method
     * @param string $uri
     * @param int $status
     * @param string $user
     * @return void
     *
     * @dataProvider routeExceptionProvider()
     */
    public function testPersonRelationshipErrors(string $method, string $uri, int $status, string $user = ''): void
    {
        if ('admin' === $user) {
            $requestingUser = parent::$writer;
        } elseif ('reader' === $user) {
            $requestingUser = self::$reader;
        } else {
            $requestingUser = ['username' => '', 'password' => ''];
        }

        $response = $this->runApp(
            $method,
            $uri,
            null,
            $this->getTokenHeaders($requestingUser['username'], $requestingUser['password'])
        );
        $this->internalTestError($response, $status);
    }

    // --------------
    // DATA PROVIDERS
    // --------------

    /**
     * Route provider (expected status: 404 NOT FOUND)
     *
     * @return array [ method, url, status, user ]
     */
    public function routeExceptionProvider(): array
    {
        return [
            // 401
            'getEntities401'     => [ 'GET', self::RUTA_API . '/1/entities',       401],
            'putAddEntity401'    => [ 'PUT', self::RUTA_API . '/1/entities/add/1', 401],
            'putRemoveEntity401' => [ 'PUT', self::RUTA_API . '/1/entities/rem/1', 401],
            'getProducts401'      => [ 'GET', self::RUTA_API . '/1/products',        401],
            'putAddProduct401'    => [ 'PUT', self::RUTA_API . '/1/products/add/1',  401],
            'putRemoveProduct401' => [ 'PUT', self::RUTA_API . '/1/products/rem/1',  401],

            // 403
            'putAddEntity403'    => [ 'PUT', self::RUTA_API . '/1/entities/add/1', 403, 'reader'],
            'putRemoveEntity403' => [ 'PUT', self::RUTA_API . '/1/entities/rem/1', 403, 'reader'],
            'putAddProduct403'    => [ 'PUT', self::RUTA_API . '/1/products/add/1',  403, 'reader'],
            'putRemoveProduct403' => [ 'PUT', self::RUTA_API . '/1/products/rem/1',  403, 'reader'],

            // 404
            'getEntities404'     => [ 'GET', self::RUTA_API . '/0/entities',       404, 'admin'],
            'putAddEntity404'    => [ 'PUT', self::RUTA_API . '/0/entities/add/1', 404, 'admin'],
            'putRemoveEntity404' => [ 'PUT', self::RUTA_API . '/0/entities/rem/1', 404, 'admin'],
            'getProducts404'      => [ 'GET', self::RUTA_API . '/0/products',        404, 'admin'],
            'putAddProduct404'    => [ 'PUT', self::RUTA_API . '/0/products/add/1',  404, 'admin'],
            'putRemoveProduct404' => [ 'PUT', self::RUTA_API . '/0/products/rem/1',  404, 'admin'],

            // 406
            'putAddEntity406'    => [ 'PUT', self::RUTA_API . '/1/entities/add/100', 406, 'admin'],
            'putRemoveEntity406' => [ 'PUT', self::RUTA_API . '/1/entities/rem/100', 406, 'admin'],
            'putAddProduct406'    => [ 'PUT', self::RUTA_API . '/1/products/add/100',  406, 'admin'],
            'putRemoveProduct406' => [ 'PUT', self::RUTA_API . '/1/products/rem/100',  406, 'admin'],
        ];
    }
}
